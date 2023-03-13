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
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import OrderStepper from '~/components/OrderStepper';
import InfoIcon from '@mui/icons-material/Info';
import { useState } from 'react';
import ProductStatistics from '~/components/ProductStatistics';
import ComplexAccordion from '~/components/ComplexAccordion';

const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

function AdminOrderDetailsPage() {
    const navigate = useNavigate();
    let createdDate = new Date();

    const [orderDataState, setOrderDataState] = useState({
        id: 1,
        date: `${createdDate.getDate()}/${createdDate.getMonth() + 1}/${createdDate.getFullYear()}`,
        orderDetails: [
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
        ],
        total: 1900000,
        status: 3,
    });

    const processOrder = () => {
        setOrderDataState((pre) => {
            return { ...pre, status: pre.status + 1 };
        });
    };

    const confirmPayment = () => {
        setOrderDataState((pre) => {
            return { ...pre, status: pre.status + 1 };
        });
    };

    const backProcess = () => {
        setOrderDataState((pre) => {
            return { ...pre, status: pre.status - 1 };
        });
    };

    const confirmWaitingDone = () => {
        setOrderDataState((pre) => {
            return { ...pre, status: pre.status + 1 };
        });
    };

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
                    {orderDataState.status > 1 && orderDataState.status < 5 && (
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
                            <div
                                onClick={confirmPayment}
                                className="w-full p-4 rounded-lg hover:bg-blue-600 active:bg-blue-700 text-center bg-blue-500 shadow-blue-300 shadow-lg cursor-pointer select-none text-white font-bold text-xl"
                            >
                                <FontAwesomeIcon icon={faMoneyBillTransfer} className="mr-2" /> Xác nhận thanh toán
                            </div>
                        </div>
                    )}
                    {orderDataState.status === 3 && (
                        <div className="w-full">
                            <div
                                onClick={confirmWaitingDone}
                                className="w-full p-4 rounded-lg hover:bg-blue-600 active:bg-blue-700 text-center bg-blue-500 shadow-blue-300 shadow-lg cursor-pointer select-none text-white font-bold text-xl"
                            >
                                <FontAwesomeIcon icon={faTruck} className="mr-2" /> Giao hàng
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
                </div>
            )}
            {orderDataState.status > 1 && (
                <div>
                    <h1 className="font-bold text-xl my-4">Thông tin thanh toán</h1>
                    <div className="w-full p-8 rounded-lg border-2 text-lg border-slate-200">
                        Thanh toán bằng thẻ paypal...
                    </div>
                </div>
            )}
            <div>
                <div className="mb-2">
                    <b className="text-gray-700">
                        <FontAwesomeIcon icon={faUser} /> Tên khách hàng:
                    </b>{' '}
                    Trần Khánh Duy.
                </div>
                <div className="mb-2">
                    <b className="text-gray-700">
                        <FontAwesomeIcon icon={faClock} /> Ngày
                    </b>{' '}
                    {orderDataState.date}.
                </div>
                <div className="mb-2">
                    <b className="text-gray-700">
                        <FontAwesomeIcon icon={faPhone} /> Số điện thoại:
                    </b>{' '}
                    0123456789.
                </div>
                <div className="mb-2">
                    <b className="text-gray-700">
                        <FontAwesomeIcon icon={faAddressCard} /> Địa chỉ:
                    </b>{' '}
                    Khu II, Đ. 3/2, Xuân Khánh, Ninh Kiều, Cần Thơ.
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
                    <span className="text-red-500">25,000đ</span>
                </div>
            </div>
            <div className="text-xl my-6">
                <b>Tổng tiền: </b>
                <span className="text-green-500">2,900,00đ</span>
            </div>
            <div>
                <h2 className="mt-4 font-bold text-xl">Danh sách sản phẩm:</h2>
                <div className="flex flex-col items-center w-full">
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
                </div>
            </div>
        </div>
    );
}

export default AdminOrderDetailsPage;
