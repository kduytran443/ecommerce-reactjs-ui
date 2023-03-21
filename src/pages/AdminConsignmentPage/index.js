import { faArrowLeft, faPlus, faTasks, faWarehouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Accordion, Avatar, Button, IconButton, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminOrder from '~/components/AdminOrder';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Category from '~/components/Category';
import SimpleAccordion from '~/components/SimpleAccordion';
import { categoryService } from '~/services/categoryService';
import { consignmentService } from '~/services/congisnmentService';
import { renderToTime } from '~/utils/renderTime';
import AdminConsignmentEditDialog from '~/components/AdminConsignmentEditDialog';
import AdminConsignmentDeleteDialog from '~/components/AdminConsignmentDeleteDialog';
import AdminStatics from '~/components/AdminStatics';

function AdminConsignmentPage() {
    const [consignmentList, setConsignmentList] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();

    const [visibleAddCategory, setVisibleAddCategory] = useState(false);
    const [newCategoryState, setNewCategoryState] = useState('');
    const loadData = () => {
        consignmentService.getConsignments().then((data) => {
            if (data.status !== 500) {
                setConsignmentList(data);
            }
        });
    };
    useEffect(() => {
        loadData();
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
                <AdminConsignmentEditDialog reload={loadData} />
            </div>
            <div className="w-full flex flex-col md:flex-row mt-4 items-start flex-wrap">
                {consignmentList.map((item, index) => {
                    return (
                        <div className="w-full md:w-[50%] lg:w-[33%] p-4">
                            <div className="w-full cursor-pointer bg-white rounded p-4 text-gray-600 select-none hover:bg-blue-300 duration-200">
                                <div className="flex flex-row items-center">
                                    <h3 className="font-bold">Lô hàng: </h3> <div className="ml-4">{item.id}</div>
                                </div>
                                <div className="flex flex-row items-center">
                                    <h3 className="font-bold">Số lượng: </h3>
                                    <div className="ml-4">{item.quantity}</div>
                                </div>
                                <div className="flex flex-row items-center">
                                    <h3 className="font-bold">Giá: </h3>
                                    <div className="ml-4">{item.price} VND</div>
                                </div>
                                <div className="flex flex-row items-center">
                                    <h3 className="font-bold">Ngày cập nhật: </h3>{' '}
                                    <div className="ml-4">{renderToTime(item.date)}</div>
                                </div>
                                <div className="w-full h-[1px] bg-slate-200 my-2"></div>
                                <div className="flex flex-row items-center">
                                    <Avatar src={item.productImage} />
                                    <div className="ml-4">{item.productName}</div>
                                </div>
                                <div className="flex mt-6 justify-end w-full md:flex-row flex-col items-center">
                                    <div className="my-2 md:my-0 md:mr-4">
                                        <AdminConsignmentEditDialog reload={loadData} consignmentId={item.id} />
                                    </div>
                                    <div className="my-2 md:my-0">
                                        <AdminConsignmentDeleteDialog reload={loadData} consignmentId={item.id} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="w-full md:w-[33%] p-4">
                <AdminStatics
                    color="bg-purple-500 shadow-purple-400"
                    data="Hàng tồn"
                    title="Thống kê"
                    icon={<FontAwesomeIcon icon={faWarehouse} />}
                    description="Thống kê hàng tồn"
                    link="/admin/view-product"
                />
            </div>
        </div>
    );
}

export default AdminConsignmentPage;
