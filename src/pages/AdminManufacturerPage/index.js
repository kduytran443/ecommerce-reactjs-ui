import { faArrowLeft, faCamera, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Button, IconButton, TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ManufacturerTable from '~/components/ManufacturerTable';
import SimpleAccordion from '~/components/SimpleAccordion';
import { manufacturerService } from '~/services/manufacturerService';

//id, avatar, name, code
function AdminManufacturerPage() {
    const [manufacturerListState, setManufacturerListState] = useState([]);

    const location = useLocation();
    const [newManufacturerState, setNewManufacturerState] = useState({});
    const [isEditingState, setIsEditingState] = useState(false);
    const navigate = useNavigate();

    const loadData = () => {
        manufacturerService.getManufacturers().then((data) => {
            if (data.length > 0) {
                console.log('data', data);
                setManufacturerListState(data);
            }
        });
    };

    useEffect(() => {
        loadData();
    }, [location]);

    const avatarRef = useRef();
    const uploadAvatar = (e) => {
        const files = e.target.files;
        for (let i = 0; i < files.length; i++) {
            let file = e.target.files[i];
            if (file) {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    setNewManufacturerState((pre) => {
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

    const submitAdd = () => {
        if (newManufacturerState.avatar && newManufacturerState.name && newManufacturerState.code) {
            console.log('newManufacturerState.avatar', newManufacturerState.avatar);
            manufacturerService
                .postManufacturer({
                    logo: newManufacturerState.avatar,
                    name: newManufacturerState.name,
                    code: newManufacturerState.code,
                    status: 1,
                })
                .then((data) => {
                    loadData();
                    setNewManufacturerState({});
                });
        }
    };

    return (
        <div className="bg-white p-6 rounded">
            <div className="mb-6">
                <Button
                    onClick={(e) => {
                        navigate('/admin/');
                    }}
                    startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
                >
                    Quay lại
                </Button>
            </div>
            <h1 className="text-3xl font-black mb-6">Nhà sản xuất</h1>
            <div className="w-full mb-10">
                {!isEditingState ? (
                    <SimpleAccordion title={<b>+ Thêm nhà sản xuất</b>}>
                        <div className="p-6 border border-slate-300 rounded-lg bg-white shadow">
                            <div className="flex flex-col md:flex-row items-center flex-wrap">
                                <div className="group w-full bg-slate-800 flex flex-col items-center justify-center py-4 rounded cursor-pointer relative duration-200 hover:shadow-md">
                                    <div>
                                        <Avatar
                                            className="group-hover:opacity-80 duration-200"
                                            src={newManufacturerState.avatar}
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
                                        <input
                                            type="file"
                                            onChange={uploadAvatar}
                                            style={{ display: 'none' }}
                                            ref={avatarRef}
                                        />
                                    </div>
                                </div>
                                <div className="my-4 w-full">
                                    Tên nhà cung cấp
                                    <div className="w-full mt-2">
                                        <TextField
                                            className="w-full"
                                            label="Tên nhà cung cấp"
                                            value={newManufacturerState.name}
                                            onInput={(e) => {
                                                setNewManufacturerState((pre) => {
                                                    return { ...pre, name: e.target.value };
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="my-4 w-full">
                                    Mã code
                                    <div className="w-full mt-2">
                                        <TextField
                                            className="w-full"
                                            label="Code"
                                            value={newManufacturerState.code}
                                            onInput={(e) => {
                                                setNewManufacturerState((pre) => {
                                                    return { ...pre, code: e.target.value };
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <Button
                                onClick={submitAdd}
                                startIcon={<FontAwesomeIcon icon={faPlus} />}
                                variant="contained"
                            >
                                Thêm nhà cung cấp
                            </Button>
                        </div>
                    </SimpleAccordion>
                ) : (
                    <div>EDIT</div>
                )}
            </div>
            {manufacturerListState.length > 0 && <ManufacturerTable reload={loadData} rows={manufacturerListState} />}
        </div>
    );
}

export default AdminManufacturerPage;
