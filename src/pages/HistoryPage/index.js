import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import HistoryOrder from '~/components/HistoryOrder';
import { paymentService } from '~/services/paymentService';
import { renderToTime } from '~/utils/renderTime';

function HistoryPage() {
    const [paymentList, setPaymentList] = useState([]);
    const location = useLocation();

    useEffect(() => {
        paymentService.getPaymentByUser().then((data) => {
            if (data.length > 0) {
                setPaymentList(data);
            }
        });
    }, [location]);

    return (
        <div>
            <h3 className="font-bold text-2xl">Lịch sử giao dịch</h3>
            <div>
                {paymentList.map((payment) => {
                    return (
                        <div>
                            <h1 className="font-bold text-xl my-4">Thông tin thanh toán</h1>
                            <div className="w-full p-8 rounded-lg border-2 text-lg border-slate-200">
                                <div className="text-gray-600">
                                    <div className="font-bold">ID transaction: </div>
                                    <div>{payment.transaction}</div>
                                    <div className="font-bold">Thời gian thanh toán: </div>
                                    <div>{renderToTime(payment.date)}</div>
                                    <div className="font-bold">Tiền đã thanh toán: </div>
                                    <div>
                                        <span className="text-blue-700 font-bold">{payment.totalPrice}</span> USD
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
                {paymentList.length === 0 && <div className="p-6 text-lg">Empty</div>}
            </div>
        </div>
    );
}

export default HistoryPage;
