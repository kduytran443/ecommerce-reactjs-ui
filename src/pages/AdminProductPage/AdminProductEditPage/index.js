import { faAdd, faArrowLeft, faCamera, faGift, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Alert,
    Avatar,
    Button,
    Checkbox,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import UploadImage from '~/components/UploadImage';
import { categoryService } from '~/services/categoryService';
import { discountService } from '~/services/discountService';
import { manufacturerService } from '~/services/manufacturerService';
import { productImageService } from '~/services/productImageService';
import { productService } from '~/services/productService';
import { productSpecificationService } from '~/services/productSpecificationService';
import { specificationService } from '~/services/specificationService';
import { renderToTime } from '~/utils';

function AdminProductEditPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { productCode } = useParams();

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

    const [idState, setIdState] = useState();

    const onInputSpecification = (id, value) => {
        const obj = { ...specificationsController };
        obj[id] = value;
        console.log('obj', obj);
        setSpecificationsController(obj);
    };

    const [nameError, setnameError] = useState('');
    const [codeError, setcodeError] = useState('');
    const [yearError, setyearError] = useState('');
    const [manufacturerError, setmanufacturerError] = useState('');
    const [priceError, setpriceError] = useState('');
    const [warrantyMonthError, setwarrantyMonthError] = useState('');
    const [categoryError, setcategoryError] = useState('');
    const [avatarError, setavatarError] = useState('');
    const [imageError, setimageError] = useState('');
    const [errorState, setErrorState] = useState('');

    const check = () => {
        let valid = true;

        if (!nameState) {
            setnameError('Tên không hợp lệ');
            valid = false;
        }

        if (!codeState) {
            setcodeError('Code không hợp lệ');
            valid = false;
        }

        const date = new Date();
        if (yearState < 2000 || yearState > date.getFullYear()) {
            setyearError('Năm không hợp lệ');
            valid = false;
        }

        if (!selectedManufacturer) {
            setmanufacturerError('Nhà sản xuất không hợp lệ');
            valid = false;
        }

        if (!priceState) {
            setpriceError('Số tiền không hợp lệ');
            valid = false;
        }

        if (warrantyState < 0 || warrantyState > 48) {
            setwarrantyMonthError('Tháng bảo hành không hợp lệ');
            valid = false;
        }

        if (!selectedCategoryCode) {
            setcategoryError('Danh mục không hợp lệ');
            valid = false;
        }

        if (!avatarState) {
            setavatarError('Hình đại diện không được bỏ trống');
            valid = false;
        }

        return valid;
    };

    const submit = () => {
        if (check()) {
            const product = {
                id: idState,
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
            productService.putProduct(product).then((data) => {
                if (data.id) {
                    setErrorState('');
                    const keys = Object.keys(specificationsController);
                    keys.forEach((key) => {
                        const content = specificationsController[key];
                        if (content) {
                            const obj = {
                                productId: data.id,
                                specificationId: key,
                                content: content,
                            };
                            productSpecificationService.putProductSpecification(obj).then((data) => {});
                        }
                    });

                    discounts.forEach((item) => {
                        if (checkIsSelected(item.id)) {
                            discountService.apply({ id: item.id }, productCode).then((data) => {});
                        } else {
                            discountService.remove({ id: item.id }, productCode).then((data) => {});
                        }
                    });
                } else {
                    setErrorState(data.message);
                }
                navigate('/admin/product');
            });
        } else {
            setErrorState('Dữ liệu đầu vào không hợp lệ');
        }
    };

    const [discounts, setDiscounts] = useState([]);
    const [selectedDiscounts, setSelectedDiscounts] = useState([]);
    const loadDiscounts = () => {
        discountService.getAll().then((data) => {
            if (data.length > 0) {
                const date = new Date();
                const arr = data.filter((item) => date < item.endTime);
                setDiscounts(arr);
            }
        });
    };
    const loadSelecetedDiscounts = () => {
        discountService.getAllByProductCode(productCode).then((data) => {
            if (data.length > 0) {
                setSelectedDiscounts(data.map((item) => item.id));
            }
        });
    };

    const addSelected = (id) => {
        const arr = [...selectedDiscounts];
        const index = arr.indexOf(id);
        if (index === -1) {
            arr.push(id);
            setSelectedDiscounts(arr);
        }
    };

    const removeSelected = (id) => {
        const arr = [...selectedDiscounts];
        const index = arr.indexOf(id);
        if (index !== -1) {
            arr.splice(index, 1);
            setSelectedDiscounts(arr);
        }
    };

    const checkIsSelected = (id) => {
        const index = selectedDiscounts.indexOf(id);
        if (index !== -1) return true;
        return false;
    };

    useEffect(() => {
        loadData();
        loadDiscounts();
        loadSelecetedDiscounts();
    }, [location]);

    const loadData = () => {
        productService.getProductByCode(productCode).then((data) => {
            if (data) {
                setNameState(data.name);
                setCodeState(data.code);
                setYearState(data.year);
                setWarrantyState(data.warrantyMonth);
                setPriceState(data.price);
                setAvatarState(data.avatar);
                setSelectedCategoryCode(data.categoryCode);
                setSelectedManufacturer(data.manufacturer.id);
                setIdState(data.id);

                productSpecificationService.getProductSpecificationByProductCode(productCode).then((data) => {
                    if (data.length > 0) {
                        let obj = {};
                        data.forEach((item) => {
                            obj[item.specificationId] = item.content;
                        });
                        setSpecificationsController(obj);
                    }
                });
            }
        });
    };

    return (
        <div className="p-6 bg-white rounded">
            <div className="mb-6">
                <Button
                    onClick={(e) => {
                        navigate('/admin/product');
                    }}
                    startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
                >
                    Quay lại
                </Button>
            </div>
            <h1 className="text-3xl font-black mb-6">Sửa sản phẩm</h1>
            <div className="flex flex-col w-full">
                <div className="w-full my-4">
                    <div>Tên sản phẩm</div>
                    <TextField
                        className="w-full"
                        error={nameError}
                        value={nameState}
                        onInput={(e) => {
                            setNameState(e.target.value);
                        }}
                    />
                    {nameError && <div className="text-red-500">*{nameError}</div>}
                </div>
                <div className="w-full my-4">
                    <div>Code sản phẩm</div>
                    <TextField
                        className="w-full"
                        value={codeState}
                        error={codeError}
                        onInput={(e) => {
                            const test = /^(\w+(-)?)*$/;
                            if (e.target.value.match(test) || e.target.value == '') {
                                setCodeState(e.target.value);
                            }
                        }}
                    />
                    {codeError && <div className="text-red-500">*{codeError}</div>}
                </div>
                <div className="w-full my-4">
                    <div>Năm sản xuất</div>
                    <TextField
                        className="w-full"
                        value={yearState}
                        error={yearError}
                        type="number"
                        onInput={(e) => {
                            setYearState(e.target.value);
                        }}
                    />
                    {yearError && <div className="text-red-500">*{yearError}</div>}
                </div>
                {selectedManufacturer && (
                    <div className="my-4">
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Nhà sản xuất</InputLabel>
                                <Select
                                    error={manufacturerError}
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
                        {manufacturerError && <div className="text-red-500">*{manufacturerError}</div>}
                    </div>
                )}
                <div className="w-full my-4">
                    <div>Giá</div>
                    <TextField
                        className="w-full"
                        value={priceState}
                        type="number"
                        onInput={(e) => {
                            setPriceState(e.target.value);
                        }}
                        error={priceError}
                    />
                    {priceError && <div className="text-red-500">*{priceError}</div>}
                </div>
                <div className="w-full my-4">
                    <div>Tháng bảo hành</div>
                    <TextField
                        className="w-full"
                        value={warrantyState}
                        type="number"
                        onInput={(e) => {
                            setWarrantyState(e.target.value);
                        }}
                        error={warrantyMonthError}
                    />
                    {warrantyMonthError && <div className="text-red-500">*{warrantyMonthError}</div>}
                </div>

                {selectedCategoryCode && (
                    <div className="my-4">
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Danh mục</InputLabel>
                                <Select
                                    disabled
                                    error={categoryError}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedCategoryCode}
                                    defaultValue={selectedCategoryCode}
                                    label="Chủ đề"
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
                        {categoryError && <div className="text-red-500">*{categoryError}</div>}
                    </div>
                )}
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
                <div>
                    {discounts.map((discount, index) => {
                        return (
                            <div className="mr-[8px]">
                                <Checkbox
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            addSelected(discount.id);
                                        } else {
                                            removeSelected(discount.id);
                                        }
                                    }}
                                    defaultChecked={checkIsSelected(discount.id)}
                                    value={checkIsSelected(discount.id)}
                                />
                                <FontAwesomeIcon className="mr-2" icon={faGift} />
                                <span>
                                    <b>{discount.discountPercent}%</b> - {discount.name} (
                                    {renderToTime(discount.startTime)} -{renderToTime(discount.endTime)})
                                </span>
                            </div>
                        );
                    })}
                </div>
                <div>
                    <div>Hình đại diện</div>
                    <UploadImage image={avatarState} callback={uploadAvatar} />
                    {avatarError && <div className="text-red-500">*{avatarError}</div>}
                </div>
            </div>
            {errorState && (
                <div className="mt-12">
                    <Alert severity="error">{errorState}</Alert>
                </div>
            )}
            <div
                onClick={submit}
                className="w-full mt-6 p-4 rounded-lg hover:bg-blue-600 active:bg-blue-700 text-center bg-blue-500 shadow-blue-300 shadow-lg cursor-pointer select-none text-white font-bold text-xl"
            >
                <FontAwesomeIcon icon={faPen} className="mr-2" /> Sửa
            </div>
        </div>
    );
}

export default AdminProductEditPage;
