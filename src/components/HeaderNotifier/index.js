import { Avatar, Badge } from '@mui/material';
import Tippy from '@tippyjs/react/headless';
import { useState } from 'react';
import HeaderAccountOptions from '../HeaderAccountOptions';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import HeaderNotifierBox from '../HeaderNotifierBox';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TemporaryDrawer from '../TemporaryDrawer';
import Cart from '../Cart';

function HeaderNotifier() {
    const [visible, setVisible] = useState(false);
    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    return (
        <TemporaryDrawer
            button={
                <div
                    onClick={(e) => {
                        setVisible(!visible);
                    }}
                    className={`cursor-pointer`}
                >
                    <Badge badgeContent={4} color="primary">
                        <ShoppingCartIcon color="action" />
                    </Badge>
                </div>
            }
        >
            <Cart main={false} />
        </TemporaryDrawer>
    );
}

export default HeaderNotifier;
