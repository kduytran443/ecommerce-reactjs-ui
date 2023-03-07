import { Button, IconButton } from '@mui/material';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import SidebarMenu from '../SidebarMenu';
import FullScreenDialog from '~/components/FullScreenDialog';
import AdminSidebarMenu from '../AdminSidebarMenu';

function AdminMobileHeaderMenu() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <IconButton sx={{ p: '10px' }} aria-label="menu" onClick={handleClickOpen}>
                <MenuIcon />
            </IconButton>
            <FullScreenDialog openState={open} handleClose={handleClose} headerTitle="Menu">
                <AdminSidebarMenu preAction={handleClose} />
            </FullScreenDialog>
        </div>
    );
}

export default AdminMobileHeaderMenu;
