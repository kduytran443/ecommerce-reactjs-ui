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
import { DialogActions, DialogContent, DialogContentText } from '@mui/material';
import { productService } from '~/services/productService';

export default function AdminProductDeleteDialog({ code, reload = () => {} }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    const deleteItem = () => {
        productService.deleteProduct({ code: code }).then((data) => {
            reload();
            handleClose();
        });
    };

    return (
        <div className="w-full">
            <div className="w-full" onClick={handleClickOpen}>
                <Button color="error">Xóa</Button>
            </div>
            <Dialog className="w-full" onClose={handleClose} open={open}>
                <DialogTitle>Xác nhận</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className="ld:w-[400px] w-[280px] flex flex-col">Xác nhận xóa sản phẩm?</div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="inherit" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button color="error" variant="contained" onClick={deleteItem} autoFocus>
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
