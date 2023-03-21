import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useRef, useState } from 'react';
import { userService } from '~/services/userService';
import AlertSuccessDialog from '~/components/AlertSuccessDialog';
import { Box } from '@mui/system';

export default function BlockUserDialog({ usernameToBlock, reload = () => {} }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [success, setSuccess] = useState(false);
    const submit = () => {
        userService.block({ username: usernameToBlock }).then((data) => {
            if (data.id) {
                setSuccess(true);
                reload();
                setTimeout(() => {
                    setSuccess(false);
                    handleClose();
                }, 2000);
            } else {
            }
        });
    };

    return (
        <div>
            <Button color="error" variant="outlined" onClick={handleClickOpen}>
                Chặn
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Chặn người dùng</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className="w-full md:w-[500px]">
                            <AlertSuccessDialog open={success} />
                            <div className="flex flex-col w-full">Chặn người dùng: {usernameToBlock}</div>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="inherit">
                        Hủy
                    </Button>
                    <Button color="error" variant="contained" onClick={submit} autoFocus>
                        Chặn
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
