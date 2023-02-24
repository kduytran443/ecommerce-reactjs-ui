import { useLocation, useNavigate } from 'react-router-dom';
import { HOME_PAGE_URL } from '~/constants';
import HomeIcon from '@mui/icons-material/Home';
import { IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

function SidebarMenu({ preAction = () => {} }) {
    const location = useLocation();
    console.log('hash', location.hash);
    console.log('pathname', location.pathname);
    console.log('search', location.search);

    const selected = false;

    const navigate = useNavigate();

    const doNavigate = (url) => {
        preAction();
        navigate(url);
    };

    return (
        <ul className="flex flex-col items-center mt-0 lg:mt-4">
            <li
                className={`select-none cursor-pointer w-[72px] h-[72px] border-gray-200 py-2 rounded-2xl my-2 flex flex-col items-center w-full hover:bg-gray-100 hover:shadow-sm ${
                    selected && ' bg-gray-200 border-[1px] shadow'
                }`}
                onClick={(e) => {
                    doNavigate(HOME_PAGE_URL);
                }}
            >
                <HomeIcon style={{ color: 'black', padding: '4px', margin: '0' }} fontSize="large" />
                <span className="text-xs font-bold">Trang chủ</span>
            </li>
            <li>
                <IconButton aria-label="other" size="large" style={{ width: '64px', height: '64px' }}>
                    <FontAwesomeIcon icon={faEllipsis} />
                </IconButton>
            </li>
        </ul>
    );
}

export default SidebarMenu;
