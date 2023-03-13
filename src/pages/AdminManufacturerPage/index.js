import { faArrowLeft, faCamera, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Button, IconButton, TextField } from '@mui/material';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ManufacturerTable from '~/components/ManufacturerTable';
import SimpleAccordion from '~/components/SimpleAccordion';

//id, avatar, name, code
function AdminManufacturerPage() {
    const [manufacturerListState, setManufacturerListState] = useState([
        {
            id: 1,
            avatar: 'https://cdn.dribbble.com/userupload/3827533/file/original-dca276f3a2211b2beb214574de05d468.jpg?resize=400x0',
            name: 'Asus',
            code: 'asus',
        },
        {
            id: 2,
            avatar: 'https://w0.peakpx.com/wallpaper/1021/824/HD-wallpaper-acer-steel-logo-metal-mesh-background-acer-logo-acer-emblem-acer-metal-background.jpg',
            name: 'Acer',
            code: 'acer',
        },
        {
            id: 3,
            avatar: 'https://inkythuatso.com/uploads/images/2021/10/dell-logo-inkythuatso-4-01-30-10-17-55.jpg',
            name: 'Dell',
            code: 'dell',
        },
        {
            id: 4,
            avatar: 'https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/0014/9595/brand.gif?itok=sLT3qVSv',
            name: 'Lenovo',
            code: 'lenovo',
        },
        {
            id: 5,
            avatar: 'https://preview.redd.it/anyone-else-notice-the-msi-logo-is-basicly-gaben-v0-e6p9hfg5ukga1.jpg?auto=webp&s=41a4e231d34271bb755458172330e7f287b61f60',
            name: 'MSI',
            code: 'msi',
        },
    ]);

    const [newManufacturerState, setNewManufacturerState] = useState({});
    const [isEditingState, setIsEditingState] = useState(false);
    const navigate = useNavigate();

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
            <h1 className="text-3xl font-black mb-6">Nhà cung cấp</h1>
            <div className="w-full mb-10">
                {!isEditingState ? (
                    <SimpleAccordion title={<b>+ Thêm nhà cung cấp</b>}>
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
                            <Button startIcon={<FontAwesomeIcon icon={faPlus} />} variant="contained">
                                Thêm nhà cung cấp
                            </Button>
                        </div>
                    </SimpleAccordion>
                ) : (
                    <div>EDIT</div>
                )}
            </div>
            <ManufacturerTable rows={manufacturerListState} />
        </div>
    );
}

export default AdminManufacturerPage;
