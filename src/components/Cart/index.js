import { faCartShopping, faCashRegister, faCheck, faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Button, Checkbox, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cartService } from '~/services/cartService';
import { deliveryFee } from '~/utils/deliveryFee';
import ComplexAccordion from '../ComplexAccordion';
import SimpleDialog from '../OrderDialog';
import ProductStatistics from '../ProductStatistics';
import RecipeReviewCard from '../RecipeReviewCard';

const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

function Cart({ main = false }) {
    const navigate = useNavigate();

    const [cartDataState, setCartDataState] = useState([]);

    const [selectedIdState, setSelectedIdState] = useState([]);
    const location = useLocation();

    const cartNavigate = (e) => {
        navigate('/cart');
    };

    useEffect(() => {
        if (selectedIdState && selectedIdState.length >= 0) {
            const total = selectedIdState.reduce((total, productId) => {
                const product = cartDataState.find((item) => item.product.id === productId);
                return product.product.price + total;
            }, 0);

            setTotalPriceState(total);
        }
    }, [selectedIdState]);

    console.log('cartDataState', cartDataState);

    const loadCart = () => {
        cartService.getCarts().then((data) => {
            if (data.status !== 500) {
                const cartList = data.map((item, index) => {
                    let discount = 0;
                    if (item.product.discounts && item.product.discounts.length > 0) {
                        item.product.discounts.forEach((discountItem) => {
                            discount += discountItem.discountPercent;
                        });
                    }

                    const obj = {
                        id: item.product.id,
                        avatar: item.product.avatar,
                        name: item.product.name,
                        price: item.product.price,
                        quantity: { quantity: item.quantity, productId: item.product.id },
                        code: item.product.code,
                    };

                    if (discount) {
                        obj['discount'] = discount;
                    }

                    return obj;
                });
                console.log('data', cartList);
                setCartDataState(cartList);
            }
        });
    };

    const decrease = (quantity, productId) => {
        const newQuantity = quantity - 1;
        if (newQuantity > 0) {
            cartService.putCart({ quantity: newQuantity, productId: productId }).then((data) => {
                console.log(data);
                if (data.status !== 500) {
                    loadCart();
                }
            });
        }
    };
    const increase = (quantity, productId) => {
        const newQuantity = quantity + 1;
        cartService.putCart({ quantity: newQuantity, productId: productId }).then((data) => {
            console.log(data);
            if (data.status !== 500) {
                loadCart();
            }
        });
    };
    const deleteCart = (code) => {
        console.log(code);
        cartService.deleteCart({ productCode: code }).then((data) => {
            console.log(data);
            if (data.status !== 500) {
                loadCart();
            }
        });
    };

    useEffect(() => {
        loadCart();
    }, [location]);

    const columns = [
        { field: 'id', headerName: 'Id' },
        {
            field: 'avatar',
            headerName: 'Hình ảnh',
            width: 80,
            renderCell: (param) => {
                return (
                    <>
                        <Avatar src={param.value} variant="rounded" />
                    </>
                );
            },
        },
        { field: 'name', headerName: 'Tên SP', width: 320 },
        {
            field: 'price',
            headerName: 'Giá',
            width: 120,
            renderCell: (param) => {
                return <>{param.value} USD</>;
            },
        },
        {
            field: 'discount',
            headerName: 'Phần trăm giảm',
            width: 100,
            renderCell: (param) => {
                return <>{param.value} %</>;
            },
        },
        {
            field: 'quantity',
            headerName: 'Số lượng',
            width: 160,
            renderCell: (param) => {
                return (
                    <>
                        <div className="flex flex-row items-center">
                            <IconButton
                                onClick={(e) => {
                                    decrease(param.value.quantity, param.value.productId);
                                }}
                            >
                                <FontAwesomeIcon icon={faMinus} />
                            </IconButton>
                            <div className="p-4 text-center">{param.value.quantity}</div>
                            <IconButton
                                onClick={(e) => {
                                    increase(param.value.quantity, param.value.productId);
                                }}
                            >
                                <FontAwesomeIcon icon={faPlus} />
                            </IconButton>
                        </div>
                    </>
                );
            },
        },
        {
            field: 'code',
            headerName: 'Thao tác',
            width: 160,
            renderCell: (param) => {
                return (
                    <>
                        <SimpleDialog
                            openButton={<Button color="error">Xóa</Button>}
                            title="Xác nhận xóa"
                            color="error"
                            agreeAction={(e) => {
                                deleteCart(param.value);
                            }}
                            isCart
                        >
                            <div className="p-4 px-10 min-w-[260px]">Xóa sản phẩm khỏi giỏ hàng?</div>
                        </SimpleDialog>
                    </>
                );
            },
        },
    ];

    const [totalPriceState, setTotalPriceState] = useState(0);
    const [deliveryFeeState, setDeliveryFeeState] = useState(() => {
        return deliveryFee;
    });

    const getTotalPrice = () => {
        const arr = [...cartDataState];

        const total = arr.reduce((prev, current) => {
            let value = current.price;
            if (current.discount) {
                value = value - value * (current.discount / 100);
            }
            return prev + value * current.quantity.quantity;
        }, 0);

        console.log(total);

        setTotalPriceState(total);
    };

    useEffect(() => {
        getTotalPrice();
    }, [cartDataState]);

    return (
        <div className="h-full flex flex-col max-h-full relative bg-white p-4 min-h-[300px]">
            <div className="flex flex-row items-center">
                {main ? (
                    <h3 className="font-black text-3xl mb-6 mt-4 ml-2">Giỏ hàng</h3>
                ) : (
                    <h3 className="font-black text-xl">Giỏ hàng</h3>
                )}
            </div>
            {cartDataState.length > 0 ? (
                <div style={{ height: 480, width: '100%' }}>
                    <DataGrid rows={cartDataState} columns={columns} />
                </div>
            ) : (
                <div className="ml-2 mt-4">Giỏ hàng trống</div>
            )}
            {cartDataState.length > 0 && (
                <>
                    <div className="text-xl text-gray-600 font-bold mt-6">
                        <p>
                            Phí vận chuyển: <span className="text-red-600">{deliveryFeeState}</span> USD
                        </p>
                        Tổng giá: <span className="text-blue-600">{totalPriceState + deliveryFeeState}</span> USD
                    </div>
                    <div className="w-full p-4 mt-8 rounded-lg hover:bg-red-600 active:bg-red-700 text-center bg-red-500 shadow-gray-300 shadow-lg cursor-pointer select-none text-white font-bold text-xl">
                        <FontAwesomeIcon icon={faCheck} /> Thanh toán
                    </div>
                </>
            )}
        </div>
    );
}

export default Cart;
