import { faArrowLeft, faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Button, IconButton, TextField } from '@mui/material';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ManufacturerTable from '~/components/ManufacturerTable';
import SimpleDialog from '~/components/OrderDialog';

//id, avatar, name, code
function AdminManufacturerDetailsPage() {
    const [manufacturerState, setManufacturerState] = useState({
        id: 1,
        avatar: 'https://cdn.dribbble.com/userupload/3827533/file/original-dca276f3a2211b2beb214574de05d468.jpg?resize=400x0',
        name: 'Asus',
        code: 'asus',
    });

    const avatarRef = useRef();
    const uploadAvatar = (e) => {
        const files = e.target.files;
        for (let i = 0; i < files.length; i++) {
            let file = e.target.files[i];
            if (file) {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    setManufacturerState((pre) => {
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

    const navigate = useNavigate();

    const cancel = () => {
        navigate('/admin/manufacturer');
    };

    return (
        <div className="bg-white p-6 rounded">
            <div className="mb-6">
                <Button
                    onClick={(e) => {
                        navigate('/admin/manufacturer');
                    }}
                    startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
                >
                    Quay lại
                </Button>
            </div>
            <h1 className="text-3xl font-black mb-6">Nhà cung cấp</h1>
            <div className="p-4 md:px-20 flex flex-col">
                <div className="mt-2">
                    <div className="group bg-slate-800 flex flex-col items-center justify-center py-4 rounded cursor-pointer relative duration-200 hover:shadow-md">
                        <div>
                            <Avatar
                                className="group-hover:opacity-80 duration-200"
                                src={manufacturerState.avatar}
                                sx={{ width: '120px', height: '120px' }}
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
                </div>
                <div className="mt-4">
                    <TextField
                        label="Tên"
                        value={manufacturerState.name}
                        onInput={(e) => {
                            setManufacturerState((pre) => {
                                return { ...pre, name: e.target.value };
                            });
                        }}
                        className="w-full"
                    />
                </div>
                <div className="mt-4">
                    <TextField
                        label="Code"
                        value={manufacturerState.code}
                        onInput={(e) => {
                            setManufacturerState((pre) => {
                                return { ...pre, code: e.target.value };
                            });
                        }}
                        className="w-full"
                    />
                </div>
                <div className="mt-8">
                    <Button onClick={cancel} color="inherit">
                        Hủy
                    </Button>
                    <Button>Thay đổi</Button>
                </div>
            </div>
        </div>
    );
}

export default AdminManufacturerDetailsPage;
