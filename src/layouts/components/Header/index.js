import { Button, IconButton } from '@mui/material';
import MobileHeaderMenu from '../MobileHeaderMenu';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HOME_PAGE_URL, LOGIN_PAGE_URL } from '~/constants';
import CustomizedInputBase from '~/components/CustomizedInputBase';
import HeaderNotifier from '~/components/HeaderNotifier';
import HeaderAvatar from '~/components/HeaderAvatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Header() {
    const navigate = useNavigate();
    const [authenticatedState, setAuthenticatedState] = useState(true);

    return (
        <header className="sticky z-50 top-0 w-full relative bg-white">
            <div className="w-full py-2 h-header-height shadow border-slate-200 border-b-[1px] flex flex-row justify-between items-center px-4">
                <div className="md:hidden block">
                    <MobileHeaderMenu />
                </div>
                <div className="md:hidden flex flex-row items-center justify-center">
                    <IconButton sx={{ p: '10px' }} aria-label="menu">
                        <SearchIcon />
                    </IconButton>
                </div>
                <div
                    className="h-full  flex-row justify-center items-center md:flex hidden select-none cursor-pointer"
                    onClick={(e) => {
                        navigate(HOME_PAGE_URL);
                    }}
                >
                    <h1 className="font-black text-xl ">TMDT</h1>
                </div>
                <div className="md:block hidden">
                    <CustomizedInputBase />
                </div>
                {authenticatedState ? (
                    <div className="flex flex-row justify-center items-center">
                        <div className="p-[10px] mr-4">
                            <HeaderNotifier />
                        </div>
                        <HeaderAvatar />
                    </div>
                ) : (
                    <div>
                        <Button
                            sx={{ borderRadius: 28 }}
                            variant="outlined"
                            onClick={(e) => {
                                navigate(LOGIN_PAGE_URL);
                            }}
                        >
                            <div className="flex flex-row justify-center items-center">
                                <FontAwesomeIcon icon={faUser} className="mr-2" />
                                <span>Đăng nhập</span>
                            </div>
                        </Button>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
