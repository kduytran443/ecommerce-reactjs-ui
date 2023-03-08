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

export default function SimpleDialog({
    openButton,
    children,
    title,
    agree = 'Đồng ý',
    cancel = 'Hủy',
    color = 'primary',
    agreeAction = () => {},
}) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    return (
        <div>
            <div onClick={handleClickOpen}>{openButton}</div>
            <Dialog className="w-full" onClose={handleClose} open={open}>
                <DialogTitle>{title}</DialogTitle>
                <div className="w-full">{children}</div>
                <div className="p-4">
                    <div className="flex flex-row items-center justify-end">
                        <Button
                            onClick={(e) => {
                                handleClose();
                            }}
                            color="inherit"
                        >
                            {cancel}
                        </Button>
                        <Button
                            onClick={(e) => {
                                handleClose();
                                agreeAction();
                            }}
                            color={color}
                            variant="contained"
                        >
                            {agree}
                        </Button>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
