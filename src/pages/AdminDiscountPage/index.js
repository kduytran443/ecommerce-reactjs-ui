import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SimpleAccordion from '~/components/SimpleAccordion';
import UserTable from '~/components/UserTable';
import AddDiscountDialog from '~/components/DiscountTable/AddDiscountDialog';
import DiscountTable from '~/components/DiscountTable';
import { discountService } from '~/services/discountService';
import DateTimePicker from 'react-datetime-picker';

function AdminDiscountPage() {
    const location = useLocation();

    const [discountListState, setDiscountListState] = useState([]);
    const loadDiscounts = () => {
        discountService.getAll().then((data) => {
            if (data.length >= 0) {
                setDiscountListState(data);
            }
        });
    };
    useEffect(() => {
        loadDiscounts();
    }, [location]);

    return (
        <div className="bg-white rounded">
            <div className="my-12 p-4 bg-white rounded">
                <div className="flex flex-row items-center mb-2">
                    <h2 className="text-xl font-bold">Giảm giá</h2>
                    <div className="ml-4">
                        <AddDiscountDialog reload={loadDiscounts} />
                    </div>
                </div>
                <DiscountTable data={discountListState} reload={loadDiscounts} />
            </div>
        </div>
    );
}

export default AdminDiscountPage;
