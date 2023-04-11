import { faAdd, faArrowLeft, faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UploadImage from '~/components/UploadImage';
import { categoryService } from '~/services/categoryService';
import { manufacturerService } from '~/services/manufacturerService';
import { productImageService } from '~/services/productImageService';
import { productService } from '~/services/productService';
import { productSpecificationService } from '~/services/productSpecificationService';
import { specificationService } from '~/services/specificationService';

function AdminProductCreatePage() {
    const location = useLocation();
    const navigate = useNavigate();

    const [nameState, setNameState] = useState('');
    const [codeState, setCodeState] = useState('');
    const [priceState, setPriceState] = useState('');
    const [manufacturers, setManufacturers] = useState([]);
    const [selectedManufacturer, setSelectedManufacturer] = useState();
    const [warrantyState, setWarrantyState] = useState();
    const [contentState, setContentState] = useState('');
    const [yearState, setYearState] = useState();

    const [imageListState, setImageListState] = useState([]);

    const [categoryListState, setCategoryListState] = useState([]);
    const [selectedCategoryCode, setSelectedCategoryCode] = useState();
    useEffect(() => {
        categoryService.getCategories().then((data) => {
            if (data.length > 0) {
                setCategoryListState(data);
            }
        });
    }, [location]);

    const [avatarState, setAvatarState] = useState();
    const avatarRef = useRef();

    const uploadAvatar = (data) => {
        setAvatarState(data);
    };

    useEffect(() => {
        manufacturerService.getManufacturers().then((data) => {
            if (data.length > 0) {
                setManufacturers(data);
            }
        });
    }, [location]);

    const [image1State, setImage1State] = useState();
    const [image2State, setImage2State] = useState();
    const [image3State, setImage3State] = useState();
    const [image4State, setImage4State] = useState();

    const [specificationListState, setSpecificationListState] = useState([]);
    const [selectedSpecificationState, setSelectedSpecificationState] = useState([]);
    const [specificationsController, setSpecificationsController] = useState({});
    useEffect(() => {
        if (selectedCategoryCode) {
            specificationService.getSpecificationByCode(selectedCategoryCode).then((data) => {
                setSpecificationListState(data);
            });
        }
    }, [selectedCategoryCode]);

    const onInputSpecification = (id, value) => {
        const obj = { ...specificationsController };
        obj[id] = value;
        console.log('obj', obj);
        setSpecificationsController(obj);
    };

    const submit = () => {
        const product = {
            name: nameState,
            code: codeState,
            year: yearState,
            status: 0,
            warrantyMonth: warrantyState,
            price: priceState,
            avatar: avatarState,
            categoryCode: selectedCategoryCode,
            manufacturer: {
                id: selectedManufacturer,
            },
        };
        productService.postProduct(product).then((data) => {
            if (data) {
                const keys = Object.keys(specificationsController);
                keys.forEach((key) => {
                    const content = specificationsController[key];
                    if (content) {
                        const obj = {
                            productId: data.id,
                            specificationId: key,
                            content: content,
                        };
                        console.log('objobj', obj);
                        productSpecificationService.postProductSpecification(obj).then((data) => {});
                    }
                });

                if (image1State) {
                    productImageService
                        .postProductImage({ data: image1State, productCode: data.code })
                        .then((data) => {});
                }
                if (image2State) {
                    productImageService
                        .postProductImage({ data: image2State, productCode: data.code })
                        .then((data) => {});
                }
                if (image3State) {
                    productImageService
                        .postProductImage({ data: image3State, productCode: data.code })
                        .then((data) => {});
                }
                if (image4State) {
                    productImageService
                        .postProductImage({ data: image4State, productCode: data.code })
                        .then((data) => {});
                }
                navigate('/admin/product');
            }
        });
    };

    return (
        <div className="p-6 bg-white rounded">
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
            <h1 className="text-3xl font-black mb-6">Thêm sản phẩm</h1>
            <div className="flex flex-col w-full">
                <div className="w-full my-4">
                    <TextField
                        className="w-full"
                        label="Tên sản phẩm"
                        value={nameState}
                        onInput={(e) => {
                            setNameState(e.target.value);
                        }}
                    />
                </div>
                <div className="w-full my-4">
                    <TextField
                        className="w-full"
                        label="Code sản phẩm"
                        value={codeState}
                        onInput={(e) => {
                            if (!e.target.value.includes(' ')) {
                                setCodeState(e.target.value);
                            }
                        }}
                    />
                </div>
                <div className="w-full my-4">
                    <TextField
                        className="w-full"
                        label="Năm sản xuất"
                        value={yearState}
                        type="number"
                        onInput={(e) => {
                            setYearState(e.target.value);
                        }}
                    />
                </div>
                <div className="my-4">
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Nhà sản xuất</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedManufacturer}
                                defaultValue={selectedManufacturer}
                                label="Chủ đề"
                                onChange={(e) => {
                                    setSelectedManufacturer(e.target.value);
                                }}
                            >
                                {manufacturers.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </div>
                <div className="w-full my-4">
                    <TextField
                        className="w-full"
                        label="Giá"
                        value={priceState}
                        type="number"
                        onInput={(e) => {
                            setPriceState(e.target.value);
                        }}
                    />
                </div>
                <div className="w-full my-4">
                    <TextField
                        className="w-full"
                        label="Tháng bảo hành"
                        value={warrantyState}
                        type="number"
                        onInput={(e) => {
                            setWarrantyState(e.target.value);
                        }}
                    />
                </div>

                <div className="my-4">
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Danh mục</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedCategoryCode}
                                defaultValue={selectedCategoryCode}
                                label="Danh mục"
                                onChange={(e) => {
                                    setSelectedCategoryCode(e.target.value);
                                }}
                            >
                                {categoryListState.map((item) => (
                                    <MenuItem key={item.code} value={item.code}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </div>
                <div>
                    {specificationListState.map((item) => {
                        return (
                            <div className="flex flex-row items-start my-4">
                                <div className="mr-6 w-[100px]">{item.name}</div>
                                <div>
                                    <TextField
                                        size="small"
                                        onInput={(e) => {
                                            onInputSpecification(item.id, e.target.value);
                                        }}
                                        value={specificationsController[item.id]}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div></div>
                <div>
                    <div>Hình đại diện</div>
                    <UploadImage image={avatarState} callback={uploadAvatar} />
                </div>
                <div className="flex mt-8 flex-row items-center flex-wrap">
                    <div>
                        <div>Hình 1</div>
                        <UploadImage
                            image={image1State}
                            callback={(data) => {
                                setImage1State(data);
                            }}
                        />
                    </div>
                    <div>
                        <div>Hình 2</div>
                        <UploadImage
                            image={image2State}
                            callback={(data) => {
                                setImage2State(data);
                            }}
                        />
                    </div>
                    <div>
                        <div>Hình 3</div>
                        <UploadImage
                            image={image3State}
                            callback={(data) => {
                                setImage3State(data);
                            }}
                        />
                    </div>
                    <div>
                        <div>Hình 4</div>
                        <UploadImage
                            image={image4State}
                            callback={(data) => {
                                setImage4State(data);
                            }}
                        />
                    </div>
                </div>
            </div>
            <div
                onClick={submit}
                className="w-full mt-8 p-4 rounded-lg hover:bg-blue-600 active:bg-blue-700 text-center bg-blue-500 shadow-blue-300 shadow-lg cursor-pointer select-none text-white font-bold text-xl"
            >
                <FontAwesomeIcon icon={faAdd} className="mr-2" /> Thêm
            </div>
        </div>
    );
}

export default AdminProductCreatePage;
