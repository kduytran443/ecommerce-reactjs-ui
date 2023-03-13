import { Avatar, Badge } from '@mui/material';
import Tippy from '@tippyjs/react/headless';
import { useState } from 'react';
import HeaderAccountOptions from '../HeaderAccountOptions';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import HeaderNotifierBox from '../HeaderNotifierBox';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TemporaryDrawer from '../TemporaryDrawer';
import Cart from '../Cart';
import { useNavigate } from 'react-router-dom';

function HeaderNotifier() {
    const navigate = useNavigate();

    return (
        <div
            onClick={(e) => {
                navigate('/cart');
            }}
            className={`cursor-pointer`}
        >
            <Badge color="primary">
                <ShoppingCartIcon color="action" />
            </Badge>
        </div>
    );
}

export default HeaderNotifier;
