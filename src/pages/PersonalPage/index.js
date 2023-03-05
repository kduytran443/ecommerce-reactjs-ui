import { Avatar, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HistoryIcon from '@mui/icons-material/History';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Address from '~/components/Address';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function PersonalPage() {
    const navigate = useNavigate();
    const [personDataState, setPersonDataState] = useState({
        id: 1,
        username: 'khanhduytran',
        fullname: 'Trần Khánh Duy',
        avatar: 'https://cdn.ntvspor.net/c355da00164e4804a042cd039df66885.jpg?crop=241,0,883,642&w=800&h=800&mode=crop',
        addressList: [
            {
                id: 1,
                content: 'Trung tâm Ngoại ngữ – Khu 1 - ĐHCT, số 411 - đường 30/4, TPCT',
            },
            {
                id: 2,
                content: 'Khu II, Đ. 3/2, Xuân Khánh, Ninh Kiều, Cần Thơ',
            },
        ],
    });

    const [visibleAddNewAddressState, setVisibleAddNewAddressState] = useState(false);
    const [newAddressState, setNewAddressState] = useState('');

    return (
        <div className="w-full">
            <div className="flex flex-col items-center p-2">
                <div>
                    <Avatar
                        className="shadow-md"
                        src={personDataState.avatar}
                        sx={{ width: '240px', height: '240px' }}
                    />
                </div>
                <div className="mt-6 text-xl flex flex-col items-center">
                    <div className="font-bold">{personDataState.fullname}</div>
                    <div className="text-gray-600">@{personDataState.username}</div>
                </div>
            </div>
            <div className="my-6">
                <Address list={personDataState.addressList} />
                <div className="w-full mt-2 h-[62px] font-bold text-slate-500 text-2xl select-none hover:bg-slate-100 active:bg-slate-200 cursor-pointer border-2 border-dashed border-slate-300 flex flex-col items-center justify-center rounded-lg">
                    <FontAwesomeIcon icon={faPlus} />
                </div>
            </div>
            <ul className="flex flex-row w-full items-center flex-wrap">
                <li className="p-4 pt-0 w-[50%] md:w-[160px]">
                    <div
                        className={`select-none aspect-square text-gray-600 cursor-pointer w-full border-gray-200 py-2 rounded-2xl my-2 flex flex-col justify-center items-center hover:bg-gray-200 hover:shadow-sm bg-gray-100 border-[1px] shadow`}
                        onClick={(e) => {
                            navigate('/history');
                        }}
                    >
                        <HistoryIcon
                            style={{ padding: '4px', margin: '0', width: '64px', height: '64px' }}
                            fontSize="large"
                        />
                        <span className="text-lg font-bold">Lịch sử</span>
                    </div>
                </li>
                <li className="p-4 pt-0 w-[50%] md:w-[160px]">
                    <div
                        className={`select-none aspect-square text-gray-600 cursor-pointer w-full border-gray-200 py-2 rounded-2xl my-2 flex flex-col justify-center items-center hover:bg-gray-200 hover:shadow-sm bg-gray-100 border-[1px] shadow`}
                        onClick={(e) => {
                            navigate('/cart');
                        }}
                    >
                        <ShoppingCartIcon
                            style={{ padding: '4px', margin: '0', width: '64px', height: '64px' }}
                            fontSize="large"
                        />
                        <span className="text-lg font-bold">Giỏ hàng</span>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default PersonalPage;
