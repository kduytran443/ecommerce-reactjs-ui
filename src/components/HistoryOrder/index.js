import { faCartShopping, faCashRegister } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Checkbox } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ComplexAccordion from '../ComplexAccordion';
import ProductStatistics from '../ProductStatistics';
import RecipeReviewCard from '../RecipeReviewCard';

const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

function HistoryOrder() {
    const navigate = useNavigate();
    const dateNow = new Date();
    const [cartDataState, setCartDataState] = useState([
        {
            quantity: 1,
            date: `${dateNow.getDate()}/${dateNow.getMonth() + 1}/${dateNow.getFullYear()}`,
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
            date: `${dateNow.getDate()}/${dateNow.getMonth() + 1}/${dateNow.getFullYear()}`,
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
            <ul className="flex flex-col w-full flex-1 h-full overflow-y-auto relative">
                {cartDataState.map((item, index) => {
                    return (
                        <>
                            <div className="flex flex-row items-center w-full">
                                <ComplexAccordion
                                    main
                                    key={item.product.id}
                                    introduction={
                                        <div className={`flex flex-col md:flex-row md:items-center`}>
                                            <div>
                                                <img className="h-[120px]" alt={'product'} src={item.product.image} />
                                            </div>
                                            <div className="font-bold text-blue-500">{item.product.name}</div>
                                        </div>
                                    }
                                >
                                    <div>
                                        <div>
                                            <Link to={`/product/${item.product.productCode}`}>
                                                <span className="font-bold text-blue-500 hover:text-blue-600 underline">
                                                    Xem sản phẩm
                                                </span>
                                            </Link>
                                            <p>
                                                <b>Giá:</b> {VND.format(item.product.price)}
                                            </p>
                                            <p>
                                                <b>Số lượng:</b> {item.quantity} cái
                                            </p>
                                            <p>
                                                <b>Ngày mua: </b>
                                                {item.date}
                                            </p>
                                        </div>
                                        <ProductStatistics mt={0} />
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
        </div>
    );
}

export default HistoryOrder;
