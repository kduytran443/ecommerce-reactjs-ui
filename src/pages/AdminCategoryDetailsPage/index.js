import { faArrowLeft, faCheckCircle, faPen, faTrash, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, IconButton, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import Specification from '~/components/Specification';
import ProductTable from '~/components/ProductTable';
import SimpleDialog from '~/components/OrderDialog';
import { specificationService } from '~/services/specificationService';
import { categoryService } from '~/services/categoryService';

function AdminCategoryDetailsPage() {
    const navigate = useNavigate();
    const { categoryCode } = useParams();

    const [categoryState, setCategoryState] = useState({});

    const [productListState, setProductListState] = useState([
        {
            id: 1,
            image: 'https://laptopaz.vn/media/product/2324_laptopaz_asus_tuf_f15_fx506lh_hn188w_1.jpg',
            name: 'Laptop Asus TUF Gaming F15 FX506LHB',
            stock: '6',
            price: '20.990.000đ',
            code: 'laptop-asus-tuf-gaming-f15-fx506lhb',
            manufacturer: 'Asus',
            discount: '10%',
        },
    ]);

    const [specificationListState, setSpecificationListState] = useState([]);
    const location = useLocation();

    const [newSpecificationState, setNewSpecificationState] = useState('');
    const [visibleEditingSpecification, setVisibleEditingSpecification] = useState(false);

    const submitNewSpecification = () => {
        if (newSpecificationState.trim()) {
            const specification = {
                name: newSpecificationState.trim(),
                categoryCode: categoryCode,
            };
            specificationService.postSpecification(specification).then((data) => {
                if (data.status !== 500) {
                    loadSpecifications();
                    setVisibleEditingSpecification(false);
                }
            });
        }
    };

    const cancelNew = () => {
        setNewSpecificationState('');
        setVisibleEditingSpecification(false);
    };

    const editSpecification = (specification) => {
        specificationService.putSpecification(specification).then((data) => {
            if (data.status !== 500) {
                setVisibleEditingSpecification(false);
                loadSpecifications();
            }
        });
    };

    const deleteSpecification = (specification) => {
        specificationService.deleteSpecification(specification).then((data) => {
            if (data.status !== 500) {
                setVisibleEditingSpecification(false);
                loadSpecifications();
            }
        });
    };

    const loadSpecifications = () => {
        specificationService.getSpecificationByCode(categoryCode).then((data) => {
            if (data.status !== 500) {
                setSpecificationListState(data);
            }
        });
    };
    useEffect(() => {
        loadSpecifications();
    }, [location]);
    useEffect(() => {
        if (categoryCode) {
            categoryService.getCategoryByCode(categoryCode).then((data) => {
                if (data.status !== 500) {
                    setCategoryState(data);
                } else {
                    navigate('/admin/category');
                }
            });
        }
    }, [location]);

    return (
        <div className="w-full bg-white p-4 md:p-12 rounded">
            <div className="mb-6 flex flex-row items-center justify-between">
                <Button
                    onClick={(e) => {
                        navigate('/admin/category');
                    }}
                    startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
                >
                    Quay lại
                </Button>

                <IconButton
                    size="medium"
                    onClick={(e) => {
                        navigate('/admin/category/edit/' + categoryCode);
                    }}
                >
                    <FontAwesomeIcon icon={faPen} />
                </IconButton>
            </div>
            <div
                className="w-full py-20 rounded"
                style={{
                    backgroundImage: `url(${categoryState.image})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                }}
            ></div>
            <div className="my-6">
                <div className="flex flex-row items-center">
                    <h1 className="font-bold text-3xl mr-2">{categoryState.name}</h1>
                </div>
            </div>
            <div className="">
                <h2 className="font-bold text-xl mt-8 mb-2">Mô tả</h2>
                <p>{categoryState.description}</p>
            </div>
            <div>
                <div className="flex flex-row items-center">
                    <h2 className="font-bold text-xl mt-8 mb-2">Thông số kỹ thuật</h2>
                </div>
                <ul className="flex flex-col w-full">
                    {specificationListState && (
                        <>
                            {specificationListState.map((specification) => {
                                return (
                                    <li className="w-full p-4 border border-slate-200 flex flex-row justify-between items-center">
                                        <Specification
                                            editAction={editSpecification}
                                            deleteAction={deleteSpecification}
                                            name={specification.name}
                                            id={specification.id}
                                        />
                                    </li>
                                );
                            })}
                            {visibleEditingSpecification && (
                                <li className="w-full p-4 border border-slate-200 flex flex-row justify-between items-center">
                                    <div className="flex-1">
                                        <TextField
                                            label="Thông số mới"
                                            className="w-full"
                                            onInput={(e) => {
                                                setNewSpecificationState(e.target.value);
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <IconButton onClick={submitNewSpecification} color="primary">
                                            <FontAwesomeIcon icon={faCheckCircle} />
                                        </IconButton>
                                        <IconButton onClick={cancelNew} color="error">
                                            <FontAwesomeIcon icon={faXmarkCircle} />
                                        </IconButton>
                                    </div>
                                </li>
                            )}
                            {!visibleEditingSpecification && (
                                <li className="w-full p-4 border border-slate-200 flex flex-row justify-center items-center">
                                    <div>
                                        <Button
                                            onClick={(e) => {
                                                setVisibleEditingSpecification(true);
                                            }}
                                            startIcon={<AddIcon />}
                                            color="primary"
                                        >
                                            Thêm thông số
                                        </Button>
                                    </div>
                                </li>
                            )}
                        </>
                    )}
                </ul>
            </div>
            <div className="mt-10">
                <SimpleDialog
                    isCart
                    openButton={
                        <Button startIcon={<FontAwesomeIcon icon={faTrash} />} variant="contained" color="error">
                            Xóa danh mục
                        </Button>
                    }
                    title="Xác nhận xóa"
                    color="error"
                    agreeAction={(e) => {
                        console.log('xóa');
                    }}
                >
                    <div className="p-4 px-20">
                        Xóa danh mục: <b>{categoryState.name}</b>
                    </div>
                </SimpleDialog>
            </div>
        </div>
    );
}

export default AdminCategoryDetailsPage;
