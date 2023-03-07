import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';

export default function AddressDialog({ openButton, children }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    return (
        <div className="w-full">
            <div className="w-full" onClick={handleClickOpen}>
                {openButton}
            </div>
            <Dialog className="w-full" onClose={handleClose} open={open}>
                <DialogTitle>Thêm địa chỉ</DialogTitle>
                <div className="w-full">{children}</div>
                <div
                    onClick={handleClose}
                    className="w-full p-4 text-center bg-gray-600 font-bold text-base select-none cursor-pointer text-white"
                >
                    Hủy
                </div>
            </Dialog>
        </div>
    );
}
