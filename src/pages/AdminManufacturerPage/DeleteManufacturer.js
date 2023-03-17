import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { manufacturerService } from '~/services/manufacturerService';

export default function DeleteManufacturer({ code, reLoad = () => {} }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const submit = () => {
        if (code) {
            manufacturerService.deleteManufacturer({ code: code }).then((data) => {
                reLoad();
            });
        }
        handleClose();
    };

    return (
        <div>
            <Button color="error" variant="outlined" onClick={handleClickOpen}>
                Xóa
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{'Xác nhận?'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className="w-[300px]">
                            Xác nhận xóa nhà sản xuất <b>{code}</b>?
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="inherit">
                        Hủy
                    </Button>
                    <Button color="error" onClick={submit} variant="contained" autoFocus>
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
