import { faEdit, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { useLocation } from 'react-router-dom';
import AlertFailDialog from '~/components/AlertFailDialog';
import AlertSuccessDialog from '~/components/AlertSuccessDialog';
import { discountService } from '~/services/discountService';

function AddDiscountDialog({ reload = () => {} }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };
    const [error, setError] = useState();

    const [discount, setDiscount] = useState({
        startTime: new Date(),
        endTime: new Date(),
        discountPercent: 0,
    });
    const [alertSuccess, setAlertSuccess] = useState(0);

    useEffect(() => {
        setDiscount({
            startTime: new Date(),
            endTime: new Date(),
            discountPercent: 0,
            name: '',
        });
        setError(false);
    }, [open]);

    console.log('discount', discount);

    const changestartTime = (value) => {
        setError(false);
        setDiscount((pre) => {
            return { ...pre, startTime: value };
        });
    };

    const changeendTime = (value) => {
        setError(false);
        setDiscount((pre) => {
            return { ...pre, endTime: value };
        });
    };

    const check = () => {
        let valid = true;

        if (discount.discountPercent <= 0) {
            valid = false;
        }

        if (discount.startTime >= discount.endTime) {
            valid = false;
        }

        return valid;
    };

    const submit = () => {
        if (check()) {
            discountService.post(discount).then((data) => {
                if (data.id) {
                    setAlertSuccess(1);
                    setTimeout(() => {
                        reload();
                        setAlertSuccess(0);
                        handleClose();
                    }, 1000);
                } else {
                    setAlertSuccess(-1);
                    setTimeout(() => {
                        setAlertSuccess(0);
                    }, 1000);
                }
            });
        } else {
            setError(true);
        }
    };

    return (
        <div className="w-full">
            <Button onClick={handleClickOpen} size="small" startIcon={<FontAwesomeIcon icon={faPlus} />}>
                Thêm
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Thêm giảm giá</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {discount && (
                            <div className="lg:w-[500px] my-2 w-[320px] min-h-[240px] flex flex-col">
                                <AlertSuccessDialog open={alertSuccess === 1} />
                                <AlertFailDialog open={alertSuccess === -1} />
                                <div className="w-full my-2">
                                    <TextField
                                        className="w-full"
                                        value={discount.name}
                                        onInput={(e) => {
                                            setError(false);
                                            setDiscount((pre) => {
                                                return { ...pre, name: e.target.value };
                                            });
                                        }}
                                        label="Tên"
                                    />
                                </div>
                                <div className="w-full my-2">
                                    <TextField
                                        className="w-full"
                                        value={discount.discountPercent}
                                        type={'number'}
                                        onInput={(e) => {
                                            if (e.target.value < 100) {
                                                setError(false);
                                                setDiscount((pre) => {
                                                    return { ...pre, discountPercent: e.target.value };
                                                });
                                            }
                                        }}
                                        label="Phần trăm"
                                    />
                                </div>
                                <div className="flex flex-col items-center w-full">
                                    {discount.startTime && (
                                        <div className="z-[40] w-full">
                                            <div className="font-bold">Bắt đầu:</div>
                                            <DateTimePicker
                                                className="h-[40px] w-full md:w-auto min-w-full"
                                                onChange={(e) => {
                                                    changestartTime(new Date(e.getTime()));
                                                }}
                                                value={new Date(discount.startTime)}
                                            />
                                        </div>
                                    )}
                                    {discount.endTime && (
                                        <div className="z-[40] w-full">
                                            <div className="font-bold">Kết thúc:</div>
                                            <DateTimePicker
                                                className="h-[40px] w-full md:w-auto min-w-full"
                                                onChange={(e) => {
                                                    changeendTime(new Date(e.getTime()));
                                                }}
                                                value={new Date(discount.endTime)}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        {error && <div className="text-red-500">*Thông tin nhập không chính xác, hãy nhập lại</div>}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="inherit">
                        Hủy
                    </Button>
                    <Button
                        variant="contained"
                        disabled={discount && discount.discountPercent <= 0}
                        onClick={submit}
                        autoFocus
                    >
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddDiscountDialog;
