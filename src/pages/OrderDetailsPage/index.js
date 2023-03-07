import { faAddressCard, faArrowLeft, faClock, faNoteSticky, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, IconButton } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ComplexAccordion from '~/components/ComplexAccordion';
import OrderStepper from '~/components/OrderStepper';
import ProductStatistics from '~/components/ProductStatistics';
import InfoIcon from '@mui/icons-material/Info';
import NumberInput from '~/components/NumberInput';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

function OrderDetailsPage() {
    const { orderId } = useParams();
    let createdDate = new Date();
    const navigate = useNavigate();

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
        status: 1,
    });

    return (
        <div className="w-full p-2">
            <div className="w-full mb-8">
                <Button
                    onClick={(e) => {
                        navigate('/order');
                    }}
                >
                    <FontAwesomeIcon className="mr-2" icon={faArrowLeft} /> Trở lại
                </Button>
                <div className="text-3xl font-bold my-2">Đơn hàng ngày {orderDataState.date}</div>
            </div>
            <div className="w-full mb-8 border border-slate-300 pb-4 rounded-lg">
                <h3 className="mt-4 ml-6 mb-6 text-gray-700 font-bold">
                    <InfoIcon /> Trạng thái đơn hàng
                </h3>
                <OrderStepper status={orderDataState.status} />
            </div>
            {orderDataState && orderDataState.status === 1 && (
                <div className="w-full mb-8 border border-slate-300 rounded-lg p-4">
                    <h3 className="mt-4 ml-2 mb-6 text-gray-700 font-bold">
                        <AccountBalanceWalletIcon /> Thanh toán
                    </h3>
                    <div className="w-full">
                        <PayPalScriptProvider options={{ 'client-id': 'test' }}>
                            <PayPalButtons style={{ layout: 'horizontal' }} />
                        </PayPalScriptProvider>
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

export default OrderDetailsPage;
