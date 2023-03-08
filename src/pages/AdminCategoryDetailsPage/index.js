import { faArrowLeft, faCheckCircle, faPen, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, IconButton, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import Specification from '~/components/Specification';
import ProductTable from '~/components/ProductTable';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 90,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

function AdminCategoryDetailsPage() {
    const navigate = useNavigate();

    const [categoryState, setCategoryState] = useState({
        id: 1,
        name: 'Laptop',
        code: 'laptop',
        specifications: [
            {
                id: 1,
                name: 'CPU',
            },
            {
                id: 2,
                name: 'RAM',
            },
            {
                id: 3,
                name: 'Ổ cứng',
            },
            {
                id: 4,
                name: 'Card đồ họa',
            },
            {
                id: 5,
                name: 'Màn hình',
            },
        ],
    });

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
    const [newSpecificationState, setNewSpecificationState] = useState('');
    const [visibleEditingSpecification, setVisibleEditingSpecification] = useState(false);

    const submitNewSpecification = () => {
        console.log('o okok ok ok');
        if (newSpecificationState.trim()) {
            let arr = categoryState.specifications;
            arr.push({ name: newSpecificationState.trim() });
            console.log('o okok ok ok');
            setCategoryState((pre) => {
                return { ...pre, specifications: arr };
            });
            setVisibleEditingSpecification(false);
        }
    };

    const cancelNew = () => {
        setNewSpecificationState('');
        setVisibleEditingSpecification(false);
    };

    const [visibleEditingName, setVisibleEditingName] = useState(false);
    const [newNameState, setNewNameState] = useState('');

    useEffect(() => {
        if (categoryState) {
            setNewNameState(categoryState.name);
        }
    }, [categoryState]);

    const submitEdit = () => {
        if (newNameState.trim()) {
            setCategoryState((pre) => {
                return { ...pre, name: newNameState };
            });
            setVisibleEditingName(false);
        }
    };

    return (
        <div className="w-full bg-white p-4 md:p-12 rounded">
            <div className="mb-6">
                <Button
                    onClick={(e) => {
                        navigate('/admin/category');
                    }}
                    startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
                >
                    Quay lại
                </Button>
            </div>
            <div className="my-6">
                {!visibleEditingName ? (
                    <div className="flex flex-row items-center">
                        <h1 className="font-bold text-3xl mr-2">{categoryState.name}</h1>
                        <IconButton
                            size="small"
                            onClick={(e) => {
                                setVisibleEditingName(true);
                            }}
                        >
                            <FontAwesomeIcon icon={faPen} />
                        </IconButton>
                    </div>
                ) : (
                    <div className="flex flex-row items-center justify-start">
                        <TextField
                            label="Tên danh mục"
                            value={newNameState}
                            onInput={(e) => {
                                setNewNameState(e.target.value);
                            }}
                            className="w-full"
                        />
                        <IconButton
                            color="error"
                            onClick={(e) => {
                                setNewNameState('');
                                setVisibleEditingName(false);
                            }}
                        >
                            <FontAwesomeIcon icon={faXmarkCircle} />
                        </IconButton>
                        {newNameState.trim() && (
                            <IconButton color="success" onClick={submitEdit}>
                                <FontAwesomeIcon icon={faCheckCircle} />
                            </IconButton>
                        )}
                    </div>
                )}
            </div>
            <div>
                <div className="flex flex-row items-center">
                    <h2 className="font-bold text-xl mt-8 mb-2">Thông số kỹ thuật</h2>
                </div>
                <ul className="flex flex-col w-full">
                    {categoryState && (
                        <>
                            {categoryState.specifications.map((specification) => {
                                return (
                                    <li className="w-full p-4 border border-slate-200 flex flex-row justify-between items-center">
                                        <Specification name={specification.name} />
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
            <div className="mt-16">
                <h2 className="font-bold text-xl mt-8 mb-2">Sản phẩm thuộc danh mục</h2>
                <ProductTable rows={productListState} />
            </div>
        </div>
    );
}

export default AdminCategoryDetailsPage;
