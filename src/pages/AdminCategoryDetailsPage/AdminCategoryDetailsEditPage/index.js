import { faAdd, faArrowLeft, faCamera, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Button, IconButton, Snackbar, TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import UploadImage from '~/components/UploadImage';
import Upload from '~/components/UploadImage';
import { categoryService } from '~/services/categoryService';

function AdminCategoryDetailsEditPage() {
    const { categoryCode } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const [categoryDataState, setCategoryDataState] = useState({
        code: '',
        description: '',
        icon: '',
        image: '',
        name: '',
        status: 1,
    });

    const onInput = (key, value) => {
        setCategoryDataState((pre) => {
            return { ...pre, [key]: value };
        });
    };

    const uploadImage = (data) => {
        onInput('image', data);
    };
    const uploadIcon = (data) => {
        onInput('icon', data);
    };

    useEffect(() => {
        if (categoryCode) {
            categoryService.getCategoryByCode(categoryCode).then((data) => {
                if (data.status !== 500) {
                    setCategoryDataState(data);
                } else {
                    navigate('/admin/category/');
                }
            });
        }
    }, [location]);

    const editCategory = (category) => {
        categoryService.putCategory(category).then((data) => {
            if (data.status !== 500) {
                console.log(data);
                setSnackbarMessage('Sửa thành công');
                //navigate('/admin/category' + categoryCode);
            }
        });
    };

    const getCategoryData = () => {
        const keys = Object.keys(categoryDataState);

        keys.forEach((key) => {});
    };

    const addNewCategory = (category) => {
        categoryService.postCategory(category).then((data) => {
            if (data.status !== 500) {
                console.log(data);
                setSnackbarMessage('Thêm thành công');
            }
        });
    };

    const [nameError, setnameError] = useState('');
    const [codeError, setcodeError] = useState('');
    const [descriptionError, setdescriptionError] = useState('');
    const [iconError, seticonError] = useState('');
    const [imageError, setimageError] = useState('');
    const addNewSubmit = () => {
        if (
            categoryDataState.name &&
            categoryDataState.code &&
            categoryDataState.description &&
            categoryDataState.icon &&
            categoryDataState.image
        ) {
            addNewCategory(categoryDataState);
        }
    };
    const editSubmit = () => {
        console.log(categoryDataState);
        editCategory(categoryDataState);
    };

    return (
        <div className="w-full p-6 rounded bg-white">
            <Snackbar open={!!snackbarMessage} autoHideDuration={5000} message={snackbarMessage} />
            <div className="mb-6">
                <Button
                    onClick={(e) => {
                        let url = '/admin/category/';
                        if (categoryCode) url += categoryCode;
                        navigate(url);
                    }}
                    startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
                >
                    Quay lại
                </Button>
            </div>
            <h1 className="font-bold text-3xl mb-6">{categoryCode ? 'Sửa danh mục' : 'Thêm danh mục'}</h1>
            <form className="w-full">
                <div className="w-full my-6">
                    <TextField
                        className="w-full"
                        value={categoryDataState.name}
                        label="Tên danh mục"
                        onChange={(e) => {
                            onInput('name', e.target.value);
                        }}
                    />
                </div>
                <div className="w-full my-6">
                    <TextField
                        className="w-full"
                        value={categoryDataState.code}
                        label="Mã code (url)"
                        onChange={(e) => {
                            onInput('code', e.target.value);
                        }}
                    />
                </div>
                <div className="w-full my-6">
                    <TextField
                        className="w-full"
                        value={categoryDataState.description}
                        label="Mô tả ngắn"
                        onChange={(e) => {
                            onInput('description', e.target.value);
                        }}
                        rows={3}
                        multiline
                    />
                </div>
                <div className="my-10">
                    <h2 className="text-xl font-bold text-slate-600">Icon</h2>
                    <UploadImage image={categoryDataState.icon} callback={uploadIcon} />
                </div>
                <div className="my-10">
                    <h2 className="text-xl font-bold text-slate-600">Hình nền</h2>
                    <UploadImage image={categoryDataState.image} callback={uploadImage} />
                </div>
                {categoryCode ? (
                    <div
                        onClick={editSubmit}
                        className="w-full mt-8 p-4 rounded-lg text-center bg-blue-500 shadow-blue-300 shadow-lg cursor-pointer select-none text-white font-bold text-xl"
                    >
                        <FontAwesomeIcon icon={faPen} className="mr-2" /> Sửa danh mục
                    </div>
                ) : (
                    <div
                        onClick={addNewSubmit}
                        className="w-full mt-8 p-4 rounded-lg text-center bg-blue-500 shadow-blue-300 shadow-lg cursor-pointer select-none text-white font-bold text-xl"
                    >
                        <FontAwesomeIcon icon={faAdd} className="mr-2" /> Thêm danh mục
                    </div>
                )}
            </form>
        </div>
    );
}

export default AdminCategoryDetailsEditPage;
