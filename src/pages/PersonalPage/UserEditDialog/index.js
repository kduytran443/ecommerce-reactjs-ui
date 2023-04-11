import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { userService } from '~/services/userService';
import AlertSuccessDialog from '~/components/AlertSuccessDialog';
import { Box } from '@mui/system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import AlertFailDialog from '~/components/AlertFailDialog';

export default function UserEditDialog({ reload = () => {} }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        clear();
        setNewAdminDataState({
            avatar: '',
            username: '',
            fullname: '',
            password: '',
            gender: '',
            brithYear: '',
            phoneNumber: '',
        });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [newAdminDataState, setNewAdminDataState] = useState({
        avatar: '',
        username: '',
        fullname: '',
        password: '',
        gender: '',
        brithYear: '',
        phoneNumber: '',
    });

    const [repasswordState, setRepasswordState] = useState('');

    const onInputNewAdmin = (property, value) => {
        setNewAdminDataState((pre) => {
            return { ...pre, [property]: value };
        });
    };

    const avatarRef = useRef();

    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [avatarError, setAvatarError] = useState('');
    const [fullnameError, setFullnameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [repasswordError, setRepasswordError] = useState('');
    const [genderError, setGenderError] = useState('');
    const [birthYearError, setBirthYearError] = useState('');
    const uploadAvatar = (e) => {
        const files = e.target.files;
        for (let i = 0; i < files.length; i++) {
            let file = e.target.files[i];
            if (file) {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    const fileSize = file.size / 1024 / 1024;
                    if (fileSize <= 1) {
                        setAvatarError('');
                        setNewAdminDataState((pre) => {
                            return { ...pre, avatar: reader.result };
                        });
                    } else {
                        setAvatarError('Vượt quá dung lượng cho phép (1MB)');
                    }
                    avatarRef.current.value = '';
                };
                reader.onerror = (error) => {
                    console.log('error uploading!');
                };
            }
        }
    };

    const clear = () => {
        setAvatarError('');
        setFullnameError('');
        setGenderError('');
        setBirthYearError('');
        setPhoneNumberError('');
    };

    const [success, setSuccess] = useState(false);
    const check = () => {
        let valid = true;
        if (
            !newAdminDataState.brithYear ||
            Number(newAdminDataState.brithYear) > 2008 ||
            Number(newAdminDataState.brithYear) < 1950
        ) {
            setBirthYearError('Năm sinh không hợp lệ');
            console.log('Năm sinh không hợp lệ', valid);
            valid = false;
        } else {
            setBirthYearError('');
        }

        if (
            !newAdminDataState.phoneNumber ||
            newAdminDataState.phoneNumber.length < 10 ||
            newAdminDataState.phoneNumber.length > 11
        ) {
            setPhoneNumberError('Số điện thoại không hợp lệ');
        } else {
            setPhoneNumberError('');
        }

        if (newAdminDataState.fullname.length < 8) {
            setFullnameError('Họ tên ít nhất 8 kí tự');
            console.log('Họ tên ít nhất 8 kí tự', valid);
            valid = false;
        } else {
            setFullnameError('');
        }

        if (!newAdminDataState.gender) {
            setGenderError('Chưa chọn giới tính');
            console.log('Chưa chọn giới tính', valid);
            valid = false;
        } else {
            setGenderError('');
        }
        return valid;
    };

    const submit = () => {
        if (check()) {
            const obj = {
                brithYear: newAdminDataState.brithYear,
                fullname: newAdminDataState.fullname,
                phoneNumber: newAdminDataState.phoneNumber,
                gender: newAdminDataState.gender,
            };
            if (newAdminDataState.avatar) {
                obj['avatar'] = newAdminDataState.avatar;
            }
            userService.put(obj).then((data) => {
                if (data.id) {
                    setSuccess(1);
                    reload();
                    setTimeout(() => {
                        setSuccess(0);
                        handleClose();
                    }, 1000);
                } else {
                    setSuccess(-1);
                    setTimeout(() => {
                        setSuccess(0);
                    }, 1000);
                }
            });
            clear();
        }
    };

    const location = useLocation();
    const loadData = () => {
        userService.getUser().then((data) => {
            if (data.id) {
                onInputNewAdmin('brithYear', data.brithYear);
                onInputNewAdmin('fullname', data.fullname);
                onInputNewAdmin('gender', data.gender);
                onInputNewAdmin('phoneNumber', data.phoneNumber);
                onInputNewAdmin('username', data.username);
            }
        });
    };
    useEffect(() => {
        loadData();
    }, [open]);

    return (
        <div>
            <IconButton onClick={handleClickOpen} size="small">
                <FontAwesomeIcon icon={faPen} />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Cập nhật thông tin cá nhân</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className="w-full md:w-[500px]">
                            <AlertSuccessDialog open={success === 1} />
                            <AlertFailDialog open={success === -1} />
                            <div className="flex flex-col w-full">
                                <div className="my-2">
                                    <TextField
                                        value={newAdminDataState.username}
                                        className="w-full"
                                        onInput={(e) => {
                                            var letterNumber = /^[0-9a-zA-Z]+$/;
                                            if (e.target.value.match(letterNumber) || e.target.value === '') {
                                                setNewAdminDataState((pre) => {
                                                    return { ...pre, username: e.target.value };
                                                });
                                            }
                                        }}
                                        disabled
                                        label="Username"
                                    />
                                    {usernameError && <div className="text-red-500">*{usernameError}</div>}
                                </div>
                                <div className="my-2">
                                    <TextField
                                        value={newAdminDataState.fullname}
                                        className="w-full"
                                        onInput={(e) => {
                                            onInputNewAdmin('fullname', e.target.value);
                                        }}
                                        label="Họ và tên"
                                    />
                                    {fullnameError && <div className="text-red-500">*{fullnameError}</div>}
                                </div>
                                <div className="my-2">
                                    <TextField
                                        value={newAdminDataState.phoneNumber}
                                        className="w-full"
                                        onInput={(e) => {
                                            if (!isNaN(e.target.value) && !e.target.value.includes(' ')) {
                                                onInputNewAdmin('phoneNumber', e.target.value);
                                            }
                                        }}
                                        label="Số điện thoại"
                                    />
                                    {phoneNumberError && <div className="text-red-500">*{phoneNumberError}</div>}
                                </div>
                                <div className="my-2">
                                    <TextField
                                        value={newAdminDataState.brithYear}
                                        className="w-full"
                                        onInput={(e) => {
                                            if (!isNaN(e.target.value) && !e.target.value.includes(' ')) {
                                                onInputNewAdmin('brithYear', e.target.value);
                                            }
                                        }}
                                        label="Năm sinh"
                                    />
                                    {birthYearError && <div className="text-red-500">*{birthYearError}</div>}
                                </div>
                                <div className="my-4">
                                    <Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={newAdminDataState.gender}
                                                defaultValue={newAdminDataState.gender}
                                                label="Giới tính"
                                                onChange={(e) => {
                                                    console.log('e.target.value');
                                                    onInputNewAdmin('gender', e.target.value);
                                                }}
                                            >
                                                <MenuItem key={'male'} value={'male'}>
                                                    Nam
                                                </MenuItem>
                                                <MenuItem key={'female'} value={'female'}>
                                                    Nữ
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    {genderError && <div className="text-red-500">*{genderError}</div>}
                                </div>
                                <div className="my-2">
                                    <h3>Ảnh đại diện (ít hơn 1MB)</h3>
                                    <div>
                                        <input type="file" onChange={uploadAvatar} />
                                    </div>
                                    {avatarError && <div className="text-red-500">*{avatarError}</div>}
                                </div>
                            </div>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="inherit">
                        Hủy
                    </Button>
                    <Button variant="contained" onClick={submit} autoFocus>
                        Thêm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
