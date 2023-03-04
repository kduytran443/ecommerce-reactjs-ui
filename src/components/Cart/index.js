import { faCartShopping, faCashRegister, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Checkbox, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ComplexAccordion from '../ComplexAccordion';
import ProductStatistics from '../ProductStatistics';
import RecipeReviewCard from '../RecipeReviewCard';

const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

function Cart({ main = false }) {
    const navigate = useNavigate();

    const [cartDataState, setCartDataState] = useState([
        {
            quantity: 1,
            product: {
                id: 1,
                image: `https://shoptaycam.com/wp-content/uploads/2018/06/Tay-cam-xbox-one-s-chinh-hang-co-day-cap-usb-cho-pc-bluetooth-gia-tai-ha-noi-tphcm-shoptaycam.com-01_02.jpg`,
                name: 'Tay Cầm Xbox One S Controller Chính Hãng Cho PC Giá Bán Xbox One S',
                price: 900000,
                productCode: 'xbox',
            },
        },
        {
            quantity: 2,
            product: {
                id: 2,
                image: `https://muagitot.com/upload_images/images/2020/12/18/avatar-tay-cam-ps4.jpg`,
                name: 'Tay Cầm Xbox One S Controller Chính Hãng Cho PC Giá Bán Xbox One S',
                price: 1000000,
                productCode: 'xbox',
            },
        },
    ]);

    const [selectedIdState, setSelectedIdState] = useState([]);
    const [totalPriceState, setTotalPriceState] = useState(0);

    const cartNavigate = (e) => {
        navigate('/cart');
    };

    useEffect(() => {
        if (cartDataState) {
            let ids = cartDataState.map((item) => item.product.id);
            setSelectedIdState(ids);
        }
    }, [cartDataState]);

    useEffect(() => {
        if (selectedIdState && selectedIdState.length >= 0) {
            const total = selectedIdState.reduce((total, productId) => {
                const product = cartDataState.find((item) => item.product.id === productId);
                return product.product.price + total;
            }, 0);

            setTotalPriceState(total);
        }
    }, [selectedIdState]);

    const deleteItem = (productId) => {
        let array = [...cartDataState];
        console.log(productId, array);
        array = array.filter((item) => item.product.id !== productId);
        console.log('filter', array);
        setCartDataState(array);
    };

    const checkAvailableId = (id) => {
        return selectedIdState.some((item) => item === id);
    };

    const clickId = (id) => {
        let array = [...selectedIdState];
        let index = array.findIndex((item) => item === id);
        if (index >= 0) {
            //hủy chọn
            array.splice(index, 1);
        } else {
            //chọn
            array.push(id);
        }
        setSelectedIdState(array);
    };

    const selectAll = () => {
        if (cartDataState) {
            if (selectedIdState.length > 0) {
                setSelectedIdState([]);
            } else {
                let ids = cartDataState.map((item) => item.product.id);
                setSelectedIdState(ids);
            }
        }
    };

    return (
        <div className="h-full flex flex-col max-h-full relative">
            <div className="flex flex-row items-center">
                {main ? (
                    <h3 className="font-black text-3xl mb-6 mt-4 ml-2">Giỏ hàng</h3>
                ) : (
                    <h3 className="font-black text-xl">Giỏ hàng</h3>
                )}
                {main && (
                    <div className="ml-4">
                        <Button onClick={selectAll}>Chọn tất cả</Button>
                    </div>
                )}
            </div>
            {cartDataState.length === 0 && <div className="ml-2 mt-4">Giỏ hàng trống</div>}
            <ul className="flex flex-col w-full flex-1 h-full overflow-y-auto relative">
                {cartDataState.map((item, index) => {
                    return (
                        <>
                            <div className="flex flex-row items-center w-full">
                                {main && (
                                    <Checkbox
                                        checked={checkAvailableId(item.product.id)}
                                        sx={{ width: '64px', height: '64px' }}
                                        onClick={(e) => {
                                            clickId(item.product.id);
                                        }}
                                    />
                                )}
                                <ComplexAccordion
                                    main={main === true}
                                    key={item.product.id}
                                    introduction={
                                        <div className={`flex flex-col ${main && 'md:flex-row'} md:items-center`}>
                                            <div>
                                                <img className="w-[200px]" alt={'product'} src={item.product.image} />
                                            </div>
                                            <div className="font-bold text-blue-500">{item.product.name}</div>
                                        </div>
                                    }
                                >
                                    <div>
                                        <div>
                                            <p>
                                                <b>Giá:</b> {VND.format(item.product.price)}
                                            </p>
                                            <div className="flex flex-row ">
                                                <div className="w-[100px]">
                                                    <b>Số lượng:</b>
                                                </div>
                                                <div className="w-[100px]">
                                                    <input className="w-full" type="number" value={item.quantity} />
                                                </div>
                                            </div>
                                        </div>
                                        <ProductStatistics mt={0} />
                                        <div className="flex flex-row items-center justify-between mt-2">
                                            <Link to={`/product/${item.product.productCode}`}>
                                                <span className="font-bold text-blue-500 hover:text-blue-600 underline">
                                                    Xem sản phẩm
                                                </span>
                                            </Link>
                                            <IconButton
                                                size="small"
                                                onClick={(e) => {
                                                    deleteItem(item.product.id);
                                                }}
                                                color="error"
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </IconButton>
                                        </div>
                                    </div>
                                </ComplexAccordion>
                            </div>
                            {index < cartDataState.length - 1 && (
                                <div className="w-full h-[2px] bg-slate-200 mt-6 mb-6"></div>
                            )}
                        </>
                    );
                })}
                <div className="h-[64px] w-full relative"></div>
            </ul>
            {main && (
                <div className="fixed bg-blue-900 text-white bottom-0 w-full p-4 border border-slate-200 rounded-lg shadow-md flex flex-col md:flex-row items-center">
                    <div className="flex flex-row items-center">
                        <h3 className="text-lg font-bold mr-2">Tổng giá</h3>
                        <span className="text-xl">{VND.format(totalPriceState)}</span>
                    </div>
                    <div className="md:ml-20 mt-2 md:mt-0">
                        <div className="w-[150px] font-bold select-none cursor-pointer p-2 text-black text-center bg-white rounded-lg shadow-md">
                            THANH TOÁN <FontAwesomeIcon icon={faCashRegister} />
                        </div>
                    </div>
                </div>
            )}
            {!main && (
                <div className="bg-white w-[284px] fixed bottom-2">
                    <div
                        onClick={cartNavigate}
                        className="flex flex-row justify-center items-center p-4 bg-red-500 text-lg cursor-pointer hover:bg-red-600 hover:shadow-lg select-none rounded shadow-md active:bg-red-700 text-white font-semibold"
                    >
                        Đi đến giỏ hàng <FontAwesomeIcon className="ml-2" icon={faCartShopping} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;
