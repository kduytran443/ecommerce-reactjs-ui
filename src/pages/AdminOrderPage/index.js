import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import AdminOrder from '~/components/AdminOrder';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { faArrowLeft, faCheck, faTasks } from '@fortawesome/free-solid-svg-icons';
import { Button, Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function AdminOrderPage() {
    const [orderListState, setOrderListState] = useState([
        {
            id: 1,
            status: 'Đang cần xử lý',
            price: 16000000,
            date: 'Ngày 3/8/2023 lúc 10:00',
        },
        {
            id: 2,
            status: 'Đang giao',
            price: 10000000,
            date: 'Ngày 2/8/2023 lúc 10:00',
        },
        {
            id: 3,
            status: 'Cần xác nhận thông tin thanh toán',
            price: 16000000,
            date: 'Ngày 1/8/2023 lúc 10:00',
        },
    ]);

    const navigate = useNavigate();

    return (
        <div>
            <div className="mb-6">
                <Button
                    onClick={(e) => {
                        navigate('/admin');
                    }}
                    startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
                >
                    Quay lại
                </Button>
            </div>
            <div className="w-full flex flex-col md:flex-row mt-4 items-center flex-wrap">
                {orderListState.map((item, index) => {
                    return (
                        <div className="w-full md:w-[33%] p-4">
                            <AdminOrder
                                color="bg-red-500 shadow-red-400"
                                data={'Đơn hàng mã số ' + item.id}
                                title={item.price}
                                icon={<FontAwesomeIcon icon={faTasks} />}
                                link={'/admin/order-details/' + item.id}
                                description={
                                    <div>
                                        <p>
                                            <b>{item.status}</b>
                                        </p>
                                        <p>{item.date}</p>
                                        <p>Sản phẩm: Tay cầm xbox, laptop asus...</p>
                                    </div>
                                }
                            />
                        </div>
                    );
                })}
            </div>
            <div className="mt-6">
                <Pagination count={10} color="primary" />
            </div>
        </div>
    );
}

export default AdminOrderPage;
