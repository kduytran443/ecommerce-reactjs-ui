import { useLocation, useNavigate } from 'react-router-dom';
import { HOME_PAGE_URL } from '~/constants';
import HomeIcon from '@mui/icons-material/Home';
import { IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import HistoryIcon from '@mui/icons-material/History';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CategoryIcon from '@mui/icons-material/Category';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

function AdminSidebarMenu({ preAction = () => {} }) {
    const selected = false;

    const navigate = useNavigate();

    const doNavigate = (url) => {
        preAction();
        navigate(url);
    };

    return (
        <ul className="flex flex-col items-center mt-0 lg:mt-4">
            <li
                className={`select-none cursor-pointer w-[72px] h-[72px] border-gray-200 py-2 rounded-2xl my-[2px] flex flex-col items-center w-full hover:bg-gray-100 hover:shadow-sm ${
                    selected && ' bg-gray-200 border-[1px] shadow'
                }`}
                onClick={(e) => {
                    doNavigate('/admin');
                }}
            >
                <HomeIcon style={{ color: 'black', padding: '4px', margin: '0' }} fontSize="large" />
                <span className="text-xs font-bold">Trang chủ</span>
            </li>
            <li
                className={`select-none cursor-pointer w-[72px] h-[72px] border-gray-200 py-2 rounded-2xl my-[2px] flex flex-col items-center w-full hover:bg-gray-100 hover:shadow-sm ${
                    selected && ' bg-gray-200 border-[1px] shadow'
                }`}
                onClick={(e) => {
                    doNavigate('/admin/order');
                }}
            >
                <AssignmentIcon style={{ color: 'black', padding: '4px', margin: '0' }} fontSize="large" />
                <span className="text-xs font-bold">Đơn hàng</span>
            </li>
            <li
                className={`select-none cursor-pointer w-[72px] h-[72px] border-gray-200 py-2 rounded-2xl my-[2px] flex flex-col items-center w-full hover:bg-gray-100 hover:shadow-sm ${
                    selected && ' bg-gray-200 border-[1px] shadow'
                }`}
                onClick={(e) => {
                    doNavigate('/admin/category');
                }}
            >
                <CategoryIcon style={{ color: 'black', padding: '4px', margin: '0' }} fontSize="large" />
                <span className="text-xs font-bold">Quản lý</span>
            </li>
            <li
                className={`select-none cursor-pointer w-[72px] h-[72px] border-gray-200 py-2 rounded-2xl my-[2px] flex flex-col items-center w-full hover:bg-gray-100 hover:shadow-sm ${
                    selected && ' bg-gray-200 border-[1px] shadow'
                }`}
                onClick={(e) => {
                    doNavigate('/admin/view-product');
                }}
            >
                <QueryStatsIcon style={{ color: 'black', padding: '4px', margin: '0' }} fontSize="large" />
                <span className="text-xs font-bold">Thống kê</span>
            </li>
        </ul>
    );
}

export default AdminSidebarMenu;
