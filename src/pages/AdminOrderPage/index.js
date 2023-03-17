import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import AdminOrder from '~/components/AdminOrder';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { faArrowLeft, faCheck, faTasks } from '@fortawesome/free-solid-svg-icons';
import { Button, IconButton, Pagination } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { orderService } from '~/services/orderService';
import { renderToDate, renderToTime } from '~/utils/renderTime';

function AdminOrderPage() {
    const [orderListState, setOrderListState] = useState([]);

    const location = useLocation();

    useEffect(() => {
        orderService.getOrders().then((data) => {
            if (data) {
                setOrderListState(data);
            }
        });
    }, [location]);

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
            <ul className="w-full flex flex-col flex-wrap p-2 md:p-0 mt-6">
                {orderListState.length > 0 &&
                    orderListState.map((order) => {
                        return (
                            <li
                                onClick={(e) => {
                                    navigate('/admin/order-details/' + order.id);
                                }}
                                className="w-ful my-4 hover:bg-blue-100 duration-100 bg-white flex flex-row items-start p-4 rounded-lg shadow cursor-pointer"
                            >
                                <div className="mr-4">
                                    <div
                                        className={
                                            'relative aspect-ratio p-2 shadow-md rounded-xl flex flex-col justify-center items-center bg-blue-500 shadow-blue-300'
                                        }
                                    >
                                        <div className="group-hover:animate-bounce duration-200 text-white font-bold text-3xl">
                                            <IconButton color="inherit">
                                                <AssignmentIcon sx={{ width: '36px', height: '36px' }} />
                                            </IconButton>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full text-gray-600">
                                    <div className="text-xl font-semibold mb-2">
                                        Đơn hàng lúc {renderToTime(order.date)}
                                    </div>
                                    <div>
                                        <b>Ngày giao hàng dự kiến:</b> {renderToDate(order.expectedTime)}
                                    </div>
                                    <div className="mt-2">
                                        <b>Trạng thái: </b>
                                        {order.status}
                                    </div>
                                    <div className="mt-2">
                                        <b>Ghi chú: </b>
                                        {order.note}
                                    </div>
                                </div>
                            </li>
                        );
                    })}
            </ul>
            {orderListState.length === 0 && <div className="mt-12 text-3xl">Không có đơn hàng nào</div>}
        </div>
    );
}

export default AdminOrderPage;
