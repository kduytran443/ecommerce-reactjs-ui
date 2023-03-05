import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Button, IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function OrderPage() {
    let createdDate = new Date();
    const navigate = useNavigate();

    const [orderListState, setOrderListState] = useState(() => [
        {
            id: 1,
            date: `${createdDate.getDate()}/${createdDate.getMonth() + 1}/${createdDate.getFullYear()}`,
            productList: [
                'Laptop MSI Modern 14 C11M 011VN',
                'Tay Cầm Xbox One S Controller Chính Hãng Cho PC Giá Bán Xbox One S',
            ],
        },
    ]);
    return (
        <div className="w-full">
            <h1 className="text-3xl font-bold mt-4 ml-2">Đơn hàng</h1>
            <ul className="w-full flex flex-col flex-wrap p-2 md:p-0 mt-6">
                {orderListState.map((order) => {
                    return (
                        <li
                            onClick={(e) => {
                                navigate('/order-details/' + order.id);
                            }}
                            className="w-full hover:bg-slate-100 flex flex-row items-center p-4 rounded-lg border border-slate-200 shadow cursor-pointer"
                        >
                            <div className="mr-4">
                                <IconButton color="primary">
                                    <AssignmentIcon sx={{ width: '36px', height: '36px' }} />
                                </IconButton>
                            </div>
                            <div className="w-full">
                                <div className="text-xl font-semibold">Đơn hàng ngày {order.date}</div>
                                <div>
                                    <b>Sản phẩm:</b> {order.productList.join(', ')}.
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default OrderPage;
