import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Button, IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { orderService } from '~/services/orderService';
import { renderToDate, renderToTime } from '~/utils/renderTime';

function OrderPage() {
    let createdDate = new Date();
    const navigate = useNavigate();

    const [orderListState, setOrderListState] = useState(() => []);

    const location = useLocation();

    useEffect(() => {
        orderService.getOrdersByUserId().then((data) => {
            if (data) {
                const arr = [...data];
                arr.sort((a, b) => {
                    return b.date - a.date;
                });
                setOrderListState(arr);
            }
        });
    }, [location]);

    return (
        <div className="w-full">
            <div className="w-full mb-8">
                <Button
                    onClick={(e) => {
                        navigate('/home');
                    }}
                >
                    <FontAwesomeIcon className="mr-2" icon={faArrowLeft} /> Trở lại
                </Button>
            </div>
            <h1 className="text-3xl font-bold mt-4 ml-2">Đơn hàng</h1>
            <ul className="w-full flex flex-col flex-wrap p-2 md:p-0 mt-6">
                {orderListState.length > 0 &&
                    orderListState.map((order) => {
                        return (
                            <li
                                onClick={(e) => {
                                    navigate('/order-details/' + order.id);
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
            {orderListState.length === 0 && (
                <div className="mt-12 font-semibold ml-8 text-3xl">Chưa có đơn hàng nào</div>
            )}
        </div>
    );
}

export default OrderPage;
