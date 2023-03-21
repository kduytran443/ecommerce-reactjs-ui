import { faPlus, faTasks } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { consignmentService } from '~/services/congisnmentService';
import { productService } from '~/services/productService';

export default function AdminConsignmentEditDialog({ reload = () => {}, consignmentId }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        clear();
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };
    const location = useLocation();

    const [productList, setProductList] = useState([]);
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState();
    const [productId, setProductId] = useState();

    useEffect(() => {
        productService.getAllProducts().then((data) => {
            if (data.length > 0) {
                setProductList(data);
            }
        });
    }, [location]);

    useEffect(() => {
        if (consignmentId) {
            consignmentService.getConsignmentById(consignmentId).then((data) => {
                console.log(data);
                if (data.id) {
                    setProductId(data.productId);
                    setPrice(data.price);
                    setQuantity(data.quantity);
                }
            });
        }
    }, [open]);

    const clear = () => {
        setPrice();
        setQuantity();
        setProductId();
    };
    const [error, setError] = useState(false);
    const submit = () => {
        if (productId && price && quantity) {
            const obj = {
                quantity: quantity,
                price: price,
                productId: productId,
            };

            if (consignmentId) {
                obj.id = consignmentId;
                consignmentService.putConsignment(obj).then((data) => {
                    if (data) {
                        reload();
                        handleClose();
                    }
                });
            } else {
                consignmentService.postConsignment(obj).then((data) => {
                    if (data) {
                        reload();
                        handleClose();
                    }
                });
            }
        } else {
            setError(true);
        }
    };

    const onInput = (e, callback) => {
        if (!isNaN(e.target.value) && !e.target.value.includes(' ')) {
            callback(e.target.value);
            setError(false);
        }
    };

    return (
        <div className="w-full">
            <Button onClick={handleClickOpen} startIcon={<FontAwesomeIcon icon={faTasks} />} variant="contained">
                {consignmentId ? 'Sửa lô hàng' : 'Thêm lô hàng'}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{consignmentId ? 'Sửa lô hàng' : 'Thêm lô hàng'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className="lg:w-[500px] w-[320px] flex flex-col">
                            {productList.length > 0 && ((consignmentId && productId) || !consignmentId) && (
                                <div className="my-4">
                                    <Box sx={{ minWidth: 220 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Sản phẩm</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={productId}
                                                defaultValue={productId}
                                                label="Chủ đề"
                                                onChange={(e) => {
                                                    setProductId(e.target.value);
                                                    setError(false);
                                                }}
                                            >
                                                {productList.map((item) => (
                                                    <MenuItem key={item.id} value={item.id}>
                                                        {item.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </div>
                            )}
                            <div className="w-full">
                                <p>Giá (VNĐ)/sản phẩm</p>
                                <TextField
                                    className="w-full"
                                    value={price}
                                    onInput={(e) => {
                                        onInput(e, setPrice);
                                    }}
                                />
                            </div>
                            <div className="w-full">
                                <p>Số lượng</p>
                                <TextField
                                    className="w-full"
                                    value={quantity}
                                    onInput={(e) => {
                                        onInput(e, setQuantity);
                                    }}
                                />
                            </div>
                        </div>
                        {error && <div className="text-red-500">*Thông tin nhập không chính xác, hãy kiểm tra lại</div>}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="inherit">
                        Hủy
                    </Button>
                    <Button variant="contained" onClick={submit} autoFocus>
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
