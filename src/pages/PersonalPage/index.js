import { Avatar, IconButton, TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HistoryIcon from '@mui/icons-material/History';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Address from '~/components/Address';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faCheck, faPaperPlane, faPen, faPlus, faX } from '@fortawesome/free-solid-svg-icons';
import AddressDialog from '~/components/AddressDialog';
import { useUser } from '~/stores/UserStore';
import { userService } from '~/services/userService';
import { addressService } from '~/services/addressService';

function PersonalPage() {
    const [userState, dispatchUserState] = useUser();

    const navigate = useNavigate();
    const [personDataState, setPersonDataState] = useState({});

    const location = useLocation();

    useEffect(() => {
        userService.getUser().then((data) => {
            if (data.status !== 500) {
                setPersonDataState(data);
            }
        });
    }, [location]);

    const [addressListState, setAddressListState] = useState([]);
    const loadAddress = () => {
        addressService.getAddress().then((data) => {
            if (data.status !== 500) {
                setAddressListState(data);
            }
        });
    };

    useEffect(() => {
        loadAddress();
    }, [location]);

    const [visibleAddNewAddressState, setVisibleAddNewAddressState] = useState(false);

    const [newAddressState, setNewAddressState] = useState('');
    const [visibleFullnameEditingState, setVisibleFullnameEditingState] = useState(false);

    const avatarRef = useRef();

    const uploadAvatar = (e) => {
        const files = e.target.files;
        for (let i = 0; i < files.length; i++) {
            let file = e.target.files[i];
            if (file) {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    setPersonDataState((pre) => {
                        return { ...pre, avatar: reader.result };
                    });
                    avatarRef.current.value = '';
                };
                reader.onerror = (error) => {
                    console.log('error uploading!');
                };
            }
        }
    };

    const postAddress = () => {
        const address = {
            details: newAddressState,
        };
        addressService.postAddress(address).then((data) => {
            if (data.status !== 500) {
                setNewAddressState('');
                loadAddress();
            }
        });
    };

    const editAddress = (address) => {
        addressService.putAddress(address).then((data) => {
            if (data.status !== 500) {
                loadAddress();
            }
        });
    };

    const deleteAddress = (id) => {
        const address = {
            id: id,
        };
        addressService.deleteAddress(address).then((data) => {
            if (data.status !== 500) {
                loadAddress();
            }
        });
    };

    const changeFullname = () => {
        //do some staff

        setVisibleFullnameEditingState(false);
    };

    return (
        <div className="w-full">
            <div className="flex flex-col items-center p-2">
                <div className="group bg-slate-800 rounded-full cursor-pointer relative duration-200 hover:shadow-md">
                    <div>
                        <Avatar
                            className="group-hover:opacity-80 duration-200"
                            src={personDataState.avatar}
                            sx={{ width: '240px', height: '240px' }}
                        />
                        <div
                            onClick={(e) => {
                                avatarRef.current.click();
                            }}
                            className="absolute bg-white rounded-full group-hover:opacity-100 opacity-0 duration-200 top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2"
                        >
                            <IconButton color="inherit" size="large">
                                <FontAwesomeIcon icon={faCamera} />
                            </IconButton>
                        </div>
                        <input type="file" onChange={uploadAvatar} style={{ display: 'none' }} ref={avatarRef} />
                    </div>
                </div>
                <div className="mt-6 text-xl flex flex-col items-center">
                    <div className="flex flex-row items-center">
                        {visibleFullnameEditingState === false ? (
                            <>
                                <div className="font-bold">{personDataState.fullname}</div>
                                <div className="ml-2">
                                    <IconButton
                                        onClick={(e) => {
                                            setVisibleFullnameEditingState(true);
                                        }}
                                        size="small"
                                    >
                                        <FontAwesomeIcon icon={faPen} />
                                    </IconButton>
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-row items-center">
                                <TextField label="Họ và tên" value={personDataState.fullname} />
                                <div className="flex flex-row items-center">
                                    <div className="ml-2">
                                        <IconButton
                                            size="small"
                                            onClick={(e) => {
                                                setVisibleFullnameEditingState(false);
                                            }}
                                            color="error"
                                        >
                                            <FontAwesomeIcon icon={faX} />
                                        </IconButton>
                                    </div>
                                    <div className="ml-2">
                                        <IconButton size="small" onClick={changeFullname} color="success">
                                            <FontAwesomeIcon icon={faCheck} />
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="text-gray-600">@{personDataState.username}</div>
                </div>
            </div>
            <div className="my-6">
                <Address list={addressListState} putAction={editAddress} deleteAction={deleteAddress} />
                <AddressDialog
                    openButton={
                        <div className="w-full mt-2 h-[62px] font-bold text-slate-500 text-2xl select-none hover:bg-slate-100 active:bg-slate-200 cursor-pointer border-2 border-dashed border-slate-300 flex flex-col items-center justify-center rounded-lg">
                            <FontAwesomeIcon icon={faPlus} />
                        </div>
                    }
                >
                    <div className="w-full flex flex-row items-center p-6">
                        <TextField
                            value={newAddressState}
                            label="Địa chỉ"
                            onInput={(e) => {
                                setNewAddressState(e.target.value);
                            }}
                        />
                        {newAddressState.trim() && (
                            <div className="ml-2">
                                <IconButton onClick={postAddress} color="primary">
                                    <FontAwesomeIcon icon={faPaperPlane} />
                                </IconButton>
                            </div>
                        )}
                    </div>
                </AddressDialog>
            </div>
            <ul className="flex flex-row w-full items-center flex-wrap">
                <li className="p-4 pt-0 w-[50%] md:w-[160px]">
                    <div
                        className={`select-none aspect-square text-gray-600 cursor-pointer w-full border-gray-200 py-2 rounded-2xl my-2 flex flex-col justify-center items-center hover:bg-gray-200 hover:shadow-sm bg-gray-100 border-[1px] shadow`}
                        onClick={(e) => {
                            navigate('/history');
                        }}
                    >
                        <HistoryIcon
                            style={{ padding: '4px', margin: '0', width: '64px', height: '64px' }}
                            fontSize="large"
                        />
                        <span className="text-lg font-bold">Lịch sử</span>
                    </div>
                </li>
                <li className="p-4 pt-0 w-[50%] md:w-[160px]">
                    <div
                        className={`select-none aspect-square text-gray-600 cursor-pointer w-full border-gray-200 py-2 rounded-2xl my-2 flex flex-col justify-center items-center hover:bg-gray-200 hover:shadow-sm bg-gray-100 border-[1px] shadow`}
                        onClick={(e) => {
                            navigate('/cart');
                        }}
                    >
                        <ShoppingCartIcon
                            style={{ padding: '4px', margin: '0', width: '64px', height: '64px' }}
                            fontSize="large"
                        />
                        <span className="text-lg font-bold">Giỏ hàng</span>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default PersonalPage;
