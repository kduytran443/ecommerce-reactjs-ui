import {
    faAddressCard,
    faArrowLeft,
    faCheckCircle,
    faClock,
    faMoneyBill1,
    faNoteSticky,
    faPhone,
    faRotateBack,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Button, IconButton, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import ComplexAccordion from '~/components/ComplexAccordion';
import OrderStepper from '~/components/OrderStepper';
import ProductStatistics from '~/components/ProductStatistics';
import InfoIcon from '@mui/icons-material/Info';
import NumberInput from '~/components/NumberInput';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { deliveryFee } from '~/utils/deliveryFee';
import { orderDetailsService } from '~/services/orderDetailsService';
import { orderService } from '~/services/orderService';
import { DataGrid } from '@mui/x-data-grid';
import { renderToTime } from '~/utils/renderTime';
import { useUser } from '~/stores/UserStore';
import { userService } from '~/services/userService';
import PaypalCheckout from '~/components/PaypalCheckout';
import { paymentService } from '~/services/paymentService';
import { API_BASE_URL } from '~/constants';
import OrderSocket from '~/components/OrderDetailsSocket';

const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

/*

nienluanctu2023user_b@gmail.com
nienluanctu2023user_a@gmail.com

*/

function OrderDetailsPage() {
    const { orderId } = useParams();
    let createdDate = new Date();
    const navigate = useNavigate();

    const [orderDataState, setOrderDataState] = useState({});

    const confirmWaitingDone = () => {
        setOrderDataState((pre) => {
            return { ...pre, status: pre.status + 1 };
        });
    };
    const [userState, dispatchUserState] = useUser();

    const [enableReturnGoods, setEnableReturnGoods] = useState(false);
    const [returnGoodsReason, setReturnGoodsReason] = useState('');
    const location = useLocation();

    const columns = [
        { field: 'id', headerName: 'Thứ tự' },
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
                return <>{param.value} VND</>;
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
                            <div className="p-4 text-center">{param.value}</div>
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
                        <Link to={'/product/' + param.value}>
                            <Button>Xem sản phẩm</Button>
                        </Link>
                    </>
                );
            },
        },
    ];

    const [orderDetailsState, setOrderDetailsState] = useState([]);
    const [totalPriceState, setTotalPriceState] = useState(0);
    const [deliveryFeeState, setDeliveryFeeState] = useState(() => {
        return deliveryFee;
    });
    const loadOrderDetails = () => {
        orderDetailsService.getOrderDetailsById(orderId).then((data) => {
            console.log('data', data);
            if (data.length > 0) {
                const list = data.map((item, index) => {
                    return {
                        id: index + 1,
                        avatar: item.productAvatar,
                        name: item.productName,
                        price: item.price,
                        quantity: item.quantity,
                        code: item.productCode,
                        discount: item.discountPercent,
                    };
                });
                setOrderDetailsState(list);
            }
        });
    };

    const loadOrder = () => {
        orderService.getOrderById(orderId).then((data) => {
            if (data.id) {
                setOrderDataState(data);
            }
        });
    };

    useEffect(() => {
        if (orderDataState.username) {
            userService.getUserByUsername(orderDataState.username).then((data) => {
                if (data.id) {
                    setUserDataState(data);
                }
            });
        }
    }, [orderDataState]);

    const [userDataState, setUserDataState] = useState({});
    useEffect(() => {
        if (userDataState && userDataState.username !== orderDataState.username) {
            navigate('/page-not-found');
        }
    }, [userDataState]);

    const loadTotalPrice = () => {
        if (orderDetailsState.length > 0) {
            let total = 0;
            orderDetailsState.forEach((orderDetails) => {
                total += orderDetails.price - orderDetails.price * (orderDetails.discount / 100);
            });
            total += deliveryFeeState;
            setTotalPriceState(total);
        }
    };

    useEffect(() => {
        loadOrder();
    }, [location]);

    useEffect(() => {
        loadOrderDetails();
    }, [location]);

    useEffect(() => {
        loadTotalPrice();
    }, [orderDetailsState]);

    const [paymentDataState, setPaymentDataState] = useState({});
    const loadPaymentInfo = () => {
        paymentService.getPaymentByOrderId(orderId).then((data) => {
            if (data) {
                console.log('?datadata', data);
                setPaymentDataState(data);
            }
        });
    };
    useEffect(() => {
        console.log('?datadata');
        loadPaymentInfo();
    }, [location]);

    const paySuccessfully = (transactionId) => {
        paymentService
            .postPayment({ transaction: transactionId, orderId: orderId, totalPrice: totalPriceState })
            .then((data) => {
                if (data) {
                    loadPaymentInfo();
                    loadOrder();
                }
            });
    };

    return (
        <div className="w-full p-4 bg-white rounded">
            <div className="w-full mb-8">
                <Button
                    onClick={(e) => {
                        navigate('/order');
                    }}
                >
                    <FontAwesomeIcon className="mr-2" icon={faArrowLeft} /> Trở lại
                </Button>
                <div className="text-3xl font-bold my-2">Đơn hàng lúc {renderToTime(orderDataState.date)}</div>
            </div>
            <div className="w-full mb-8 border border-slate-300 pb-4 rounded-lg">
                <h3 className="mt-4 ml-6 mb-6 text-gray-700 font-bold">
                    <InfoIcon /> Trạng thái đơn hàng
                </h3>
                <OrderStepper status={orderDataState.status - 1} />
            </div>
            {orderDataState && orderDataState.status === 1 && (
                <>
                    <div className="w-full mb-8 border border-slate-300 rounded-lg p-4">
                        <h3 className="mt-4 ml-2 mb-6 text-gray-700 font-bold">
                            <AccountBalanceWalletIcon /> Thanh toán
                        </h3>
                        <PaypalCheckout
                            successAction={paySuccessfully}
                            username={userDataState.username}
                            email={userDataState.email}
                            phoneNumber={userDataState.phoneNumber}
                            totalPrice={totalPriceState}
                            orderDataId={orderId}
                        />
                    </div>
                </>
            )}

            {orderDataState.status === 4 && (
                <div className="w-full">
                    <div
                        onClick={confirmWaitingDone}
                        className="w-full p-4 rounded-lg hover:bg-blue-600 active:bg-blue-700 text-center bg-blue-500 shadow-blue-300 shadow-lg cursor-pointer select-none text-white font-bold text-xl"
                    >
                        <FontAwesomeIcon icon={faCheckCircle} className="mr-2" /> Xác nhận đã giao
                    </div>
                </div>
            )}
            {orderDataState.status > 1 && paymentDataState && (
                <div>
                    <h1 className="font-bold text-xl my-4">Thông tin thanh toán</h1>
                    <div className="w-full p-8 rounded-lg border-2 text-lg border-slate-200">
                        <div className="text-gray-600">
                            <div className="font-bold">ID transaction: </div>
                            <div>{paymentDataState.transaction}</div>
                            <div className="font-bold">Thời gian thanh toán: </div>
                            <div>{renderToTime(paymentDataState.date)}</div>
                            <div className="font-bold">Tiền đã thanh toán: </div>
                            <div>
                                <span className="text-blue-700 font-bold">{paymentDataState.totalPrice}</span> VND
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div>
                <div className="mb-2">
                    <b className="text-gray-700">
                        <FontAwesomeIcon icon={faUser} /> Tên khách hàng:
                    </b>{' '}
                    {userDataState.fullname}
                </div>
                <div className="mb-2">
                    <b className="text-gray-700">
                        <FontAwesomeIcon icon={faClock} /> Ngày
                    </b>{' '}
                    {renderToTime(orderDataState.date)}.
                </div>
                <div className="mb-2">
                    <b className="text-gray-700">
                        <FontAwesomeIcon icon={faPhone} /> Số điện thoại:
                    </b>{' '}
                    {userDataState.phoneNumber}.
                </div>
                <div className="mb-2">
                    <b className="text-gray-700">
                        <FontAwesomeIcon icon={faAddressCard} /> Địa chỉ:
                    </b>{' '}
                    {orderDataState.address && orderDataState.address.details}
                </div>
                <div className="mb-2">
                    <b className="text-gray-700">
                        <FontAwesomeIcon icon={faNoteSticky} /> Ghi chú:
                    </b>{' '}
                    Không.
                </div>
                <div className="mb-2">
                    <b className="text-gray-700">
                        <FontAwesomeIcon icon={faNoteSticky} /> Phí vận chuyển:
                    </b>{' '}
                    <span className="text-red-500">{deliveryFeeState} VND</span>
                </div>
            </div>
            <div className="text-xl my-6">
                <b>Tổng tiền: </b>
                <span className="text-green-500">{totalPriceState} VND</span>
            </div>
            <div>
                <h2 className="mt-4 font-bold text-xl">Danh sách sản phẩm:</h2>
                <div className="flex flex-col items-center w-full"></div>
            </div>
            <div style={{ height: 480, width: '100%' }}>
                <DataGrid rows={orderDetailsState} columns={columns} />
            </div>
        </div>
    );
}

export default OrderDetailsPage;

/*

            <div className="w-full">
                <div
                    onClick={(e) => {
                        setEnableReturnGoods(true);
                    }}
                    className="w-full mt-8 p-4 rounded-lg text-center bg-red-500 active:bg-red-700 hover:bg-red-600 shadow-red-300 shadow-md cursor-pointer select-none text-white font-bold text-xl"
                >
                    <FontAwesomeIcon icon={faRotateBack} className="mr-2" /> Yêu cầu đổi trả
                </div>
                {enableReturnGoods && (
                    <div className="w-full p-4 rounded border border-slate-200 mt-6">
                        <div className="w-full">
                            <TextField
                                className="w-full"
                                value={returnGoodsReason}
                                onInput={(e) => {
                                    setReturnGoodsReason(e.target.value);
                                }}
                                label="Lý do"
                            />
                        </div>
                        <div className="flex flex-col md:flex-row justify-center mt-4 items-center">
                            <Button
                                color="inherit"
                                onClick={(e) => {
                                    setEnableReturnGoods(false);
                                }}
                            >
                                Hủy
                            </Button>
                            <Button color="error" variant="contained">
                                Đổi trả
                            </Button>
                        </div>
                    </div>
                )}
            </div>

                    {orderDataState.orderDetails.map((orderDetail) => {
                        return (
                            <div className="my-4 w-full">
                                <ComplexAccordion
                                    main={true}
                                    introduction={
                                        <div className={`flex flex-col md:flex-row md:items-center`}>
                                            <div>
                                                <img
                                                    className="w-[200px]"
                                                    alt={'product'}
                                                    src={orderDetail.product.image}
                                                />
                                            </div>
                                            <div className="font-bold text-blue-500">{orderDetail.product.name}</div>
                                        </div>
                                    }
                                >
                                    <div>
                                        <div>
                                            <p>
                                                <b>Giá:</b> {VND.format(orderDetail.product.price)}
                                            </p>
                                            <div className="flex flex-row ">
                                                <div className="w-[100px]">
                                                    <b>Số lượng:</b>
                                                </div>
                                                <div className="w-[100px]">
                                                    <input
                                                        className="w-full"
                                                        type="number"
                                                        value={orderDetail.quantity}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <ProductStatistics mt={0} />
                                        <div className="flex flex-row items-center justify-between mt-2">
                                            <Link to={`/product/${orderDetail.product.productCode}`}>
                                                <span className="font-bold text-blue-500 hover:text-blue-600 underline">
                                                    Xem sản phẩm
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </ComplexAccordion>
                            </div>
                        );
                    })}
                    

*/
