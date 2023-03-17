import { faPlus, faTasks, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { consignmentService } from '~/services/congisnmentService';
import { productService } from '~/services/productService';

export default function AdminConsignmentDeleteDialog({ reload = () => {}, consignmentId }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    const submit = () => {
        consignmentService.deleteConsignment({ id: consignmentId }).then((data) => {
            if (data) {
                reload();
                handleClose();
            }
        });
    };

    return (
        <div className="w-full">
            <Button
                onClick={handleClickOpen}
                color="error"
                startIcon={<FontAwesomeIcon icon={faTrash} />}
                variant="contained"
            >
                Xóa
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Xóa lô hàng?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className="lg:w-[500px] w-[320px] flex flex-col">
                            Xác nhận xóa lô hàng id: <b>{consignmentId}</b>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="inherit">
                        Hủy
                    </Button>
                    <Button variant="contained" color="error" onClick={submit} autoFocus>
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
