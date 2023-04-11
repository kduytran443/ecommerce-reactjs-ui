import {
    faAddressCard,
    faArrowLeft,
    faCheck,
    faCheckCircle,
    faClock,
    faMoneyBill,
    faMoneyBill1,
    faMoneyBillTransfer,
    faNoteSticky,
    faPhone,
    faRotateBack,
    faTruck,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Button } from '@mui/material';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import OrderStepper from '~/components/OrderStepper';
import InfoIcon from '@mui/icons-material/Info';
import { useEffect, useRef, useState } from 'react';
import ProductStatistics from '~/components/ProductStatistics';
import ComplexAccordion from '~/components/ComplexAccordion';
import { orderService } from '~/services/orderService';
import { deliveryFee } from '~/utils/deliveryFee';
import { orderDetailsService } from '~/services/orderDetailsService';
import { userService } from '~/services/userService';
import { DataGrid } from '@mui/x-data-grid';
import { renderToTime } from '~/utils/renderTime';
import { paymentService } from '~/services/paymentService';
import OrderSocket from '~/components/OrderDetailsSocket';

const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

function AdminOrderDetailsPage() {
    const { orderId } = useParams();
    const navigate = useNavigate();
    let createdDate = new Date();

    const [orderDataState, setOrderDataState] = useState({});

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

    const processOrder = () => {
        orderService.updateOrderStatus(orderId, 3).then((data) => {
            if (data) {
                loadOrder();
            }
        });
        loadOrder();
    };

    const backProcess = () => {
        orderService.updateOrderStatus(orderId, 2).then((data) => {
            if (data) {
                loadOrder();
            }
        });
        loadOrder();
    };

    const confirmWaitingDone = () => {
        orderService.updateOrderStatus(orderId, 5).then((data) => {
            if (data) {
                loadOrder();
            }
        });
        loadOrder();
    };

    const confirmDeliver = () => {
        orderService.updateOrderStatus(orderId, 4).then((data) => {
            if (data) {
                loadOrder();
            }
        });
        loadOrder();
    };

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
                console.log('LOAD ORDER');
                setOrderDataState(data);
            }
        });
    };

    const [userDataState, setUserDataState] = useState({});
    useEffect(() => {
        if (orderDataState.username) {
            userService.getUserByUsername(orderDataState.username).then((data) => {
                if (data.id) {
                    setUserDataState(data);
                }
            });
        }
    }, [orderDataState]);

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
                setPaymentDataState(data);
            }
        });
    };
    useEffect(() => {
        loadPaymentInfo();
    }, [location]);

    const documentRef = useRef();

    return (
        <div className="w-full bg-white rounded p-4 shadow">
            <div className="mb-6">
                <Button
                    onClick={(e) => {
                        navigate('/admin/order');
                    }}
                    startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
                >
                    Quay lại
                </Button>
            </div>
            <div className="w-full mb-8 border border-slate-300 pb-4 rounded-lg">
                <h3 className="mt-4 ml-6 mb-6 text-gray-700 font-bold">
                    <InfoIcon /> Trạng thái đơn hàng
                </h3>
                <OrderStepper status={orderDataState.status - 1} />
            </div>
            {orderDataState && (
                <div className="w-full mb-8 flex flex-row items-center">
                    {orderDataState && (
                        <OrderSocket loadOrder={loadOrder} orderId={orderId}>
                            <>
                                {orderDataState.status === 3 && (
                                    <div className="w-[64px]">
                                        <div
                                            onClick={backProcess}
                                            className="w-full p-4 rounded-lg hover:bg-gray-600 active:bg-gray-700 text-center bg-gray-500 shadow-gray-300 shadow-lg cursor-pointer select-none text-white font-bold text-xl"
                                        >
                                            <FontAwesomeIcon icon={faRotateBack} />
                                        </div>
                                    </div>
                                )}
                                {orderDataState.status === 2 && (
                                    <div className="w-full">
                                        <div
                                            onClick={processOrder}
                                            className="w-full p-4 rounded-lg hover:bg-blue-600 active:bg-blue-700 text-center bg-blue-500 shadow-blue-300 shadow-lg cursor-pointer select-none text-white font-bold text-xl"
                                        >
                                            Xác nhận đã xử lý đơn hàng
                                        </div>
                                    </div>
                                )}
                                {orderDataState.status === 1 && (
                                    <div className="w-full">
                                        <div className="w-full p-4 rounded-lg hover:bg-red-600 active:bg-red-700 text-center bg-red-500 shadow-blue-300 shadow-lg cursor-pointer select-none text-white font-bold text-xl">
                                            <FontAwesomeIcon icon={faMoneyBillTransfer} className="mr-2" /> Chưa thanh
                                            toán
                                        </div>
                                    </div>
                                )}
                                {orderDataState.status === 3 && (
                                    <div className="w-full">
                                        <div
                                            onClick={confirmDeliver}
                                            className="w-full p-4 rounded-lg hover:bg-blue-600 active:bg-blue-700 text-center bg-blue-500 shadow-blue-300 shadow-lg cursor-pointer select-none text-white font-bold text-xl"
                                        >
                                            <FontAwesomeIcon icon={faTruck} className="mr-2" /> Xác nhận giao hàng
                                        </div>
                                    </div>
                                )}
                                {orderDataState.status === 4 && (
                                    <div className="w-full">
                                        <div
                                            onClick={confirmWaitingDone}
                                            className="w-full p-4 rounded-lg hover:bg-blue-600 active:bg-blue-700 text-center bg-blue-500 shadow-blue-300 shadow-lg cursor-pointer select-none text-white font-bold text-xl"
                                        >
                                            <FontAwesomeIcon icon={faTruck} className="mr-2" /> Giao thành công
                                        </div>
                                    </div>
                                )}
                                {orderDataState.status === 5 && (
                                    <div className="w-full">
                                        <div className="w-full p-4 rounded-lg text-center bg-blue-500 shadow-blue-300 shadow-lg cursor-pointer select-none text-white font-bold text-xl">
                                            <FontAwesomeIcon icon={faCheck} className="mr-2" /> Đã hoàn thành
                                        </div>
                                        <div className="w-full mt-8 p-4 rounded-lg text-center bg-red-500 shadow-red-300 shadow-lg cursor-pointer select-none text-white font-bold text-xl">
                                            <FontAwesomeIcon icon={faMoneyBill1} className="mr-2" /> Xuất hóa đơn
                                        </div>
                                    </div>
                                )}
                            </>
                        </OrderSocket>
                    )}
                </div>
            )}
            <div>
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
                    <div className="flex flex-col items-center w-full">
                        <div style={{ height: 480, width: '100%' }}>
                            <DataGrid rows={orderDetailsState} columns={columns} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminOrderDetailsPage;
