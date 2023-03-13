import { faArrowLeft, faPlus, faTasks } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Accordion, Button, IconButton, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminOrder from '~/components/AdminOrder';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Category from '~/components/Category';
import SimpleAccordion from '~/components/SimpleAccordion';
import { categoryService } from '~/services/categoryService';

function AdminCategoryPage() {
    const [categoryListState, setCategoryListState] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();

    const [visibleAddCategory, setVisibleAddCategory] = useState(false);
    const [newCategoryState, setNewCategoryState] = useState('');

    useEffect(() => {
        categoryService.getCategories().then((data) => {
            if (data.status !== 500) {
                setCategoryListState(data);
            }
        });
    }, [location]);

    return (
        <div>
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
            <div className="w-full">
                <Button
                    onClick={(e) => {
                        navigate('/admin/category/edit');
                    }}
                    startIcon={<FontAwesomeIcon icon={faPlus} />}
                    variant="contained"
                >
                    Thêm danh mục
                </Button>
            </div>
            <div className="w-full flex flex-col md:flex-row mt-4 items-start flex-wrap">
                {categoryListState.map((item, index) => {
                    return (
                        <div className="w-full md:w-[50%] lg:w-[33%] p-4">
                            <Category
                                color="bg-gray-200 shadow-gray-100"
                                data={item.name}
                                code={item.code}
                                image={item.icon}
                                link={'/admin/category/' + item.code}
                                description={item.description}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default AdminCategoryPage;
