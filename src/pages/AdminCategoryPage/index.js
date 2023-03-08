import { faArrowLeft, faPlus, faTasks } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Accordion, Button, IconButton, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminOrder from '~/components/AdminOrder';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Category from '~/components/Category';
import SimpleAccordion from '~/components/SimpleAccordion';

function AdminCategoryPage() {
    const [categoryListState, setCategoryListState] = useState([
        {
            id: 1,
            name: 'Laptop',
            code: 'laptop',
            products: 5,
            image: 'https://images.fpt.shop/unsafe/fit-in/60x60/filters:quality(90):fill(transparent)/fptshop.com.vn/Uploads/images/2022/iconcate/icon-laptop.png',
            description:
                'Máy tính xách tay hay máy vi tính xách tay là một chiếc máy tính cá nhân nhỏ gọn có thể mang xách được. Nó thường có trọng lượng nhẹ và kiểu máy dành cho mỗi đối tượng có mục đích sử dụng khác nhau.',
        },
        {
            id: 2,
            name: 'PC - Linh kiện lắp ráp',
            code: 'linh-kien',
            products: 4,
            image: 'https://images.fpt.shop/unsafe/fit-in/60x60/filters:quality(90):fill(transparent)/fptshop.com.vn/Uploads/images/2022/iconcate/icon-pc.png',
            description:
                'Linh kiện máy tính nói một cách dễ hiểu là tổng hợp các bộ phận cấu tạo nên một chiếc case máy tính.',
        },
        {
            id: 3,
            name: 'Phụ kiện',
            code: 'phu-kien',
            products: 6,
            image: 'https://images.fpt.shop/unsafe/fit-in/60x60/filters:quality(90):fill(transparent)/fptshop.com.vn/Uploads/images/2022/iconcate/icon-accessories.png',
            description: 'Phụ kiện máy tính là các thiết bị có thể kết nối với máy như: bàn phím, tai nghe, chuột,...',
        },
    ]);

    const navigate = useNavigate();

    const [visibleAddCategory, setVisibleAddCategory] = useState(false);
    const [newCategoryState, setNewCategoryState] = useState('');

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
                <SimpleAccordion title="Thêm danh mục">
                    <div className="p-6 border border-slate-300 rounded-lg bg-white shadow">
                        <div className="flex flex-col md:flex-row items-center flex-wrap">
                            <div className="my-4 w-full">
                                Tên danh mục
                                <div className="w-full mt-2">
                                    <TextField
                                        className="w-full"
                                        label="Tên danh mục"
                                        value={newCategoryState}
                                        onInput={(e) => {
                                            setNewCategoryState(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="my-4 w-full">
                                Mã code
                                <div className="w-full mt-2">
                                    <TextField
                                        label="Code"
                                        className="w-full"
                                        value={newCategoryState}
                                        onInput={(e) => {
                                            setNewCategoryState(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <Button startIcon={<FontAwesomeIcon icon={faPlus} />} variant="contained">
                            Thêm danh mục
                        </Button>
                    </div>
                </SimpleAccordion>
            </div>
            <div className="w-full flex flex-col md:flex-row mt-4 items-start flex-wrap">
                {categoryListState.map((item, index) => {
                    return (
                        <div className="w-full md:w-[33%] p-4">
                            <Category
                                color="bg-gray-200 shadow-gray-100"
                                data={item.products + ' sản phẩm'}
                                name={item.name}
                                code={item.code}
                                image={item.image}
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
