import { faSalesforce } from '@fortawesome/free-brands-svg-icons';
import { faIndustry, faLaptop, faMoneyBill, faTasks, faUser, faWarehouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AdminStatics from '~/components/AdminStatics';
import WarehouseIcon from '@mui/icons-material/Warehouse';

function AdminHomePage() {
    return (
        <div className="w-full">
            <div className="w-full flex flex-col md:flex-row mt-4 items-center flex-wrap">
                <div className="w-full md:w-[33%] p-4">
                    <AdminStatics
                        color="blue"
                        data="26.5 tr"
                        title="Doanh thu"
                        icon={<FontAwesomeIcon icon={faMoneyBill} />}
                        description="Doanh thu website"
                    />
                </div>
                <div className="w-full md:w-[33%] p-4">
                    <AdminStatics
                        color="green"
                        data="10 người"
                        title="Người dùng"
                        icon={<FontAwesomeIcon icon={faUser} />}
                        description="Số người dùng đã đăng ký tài khoản"
                    />
                </div>
                <div className="w-full md:w-[33%] p-4">
                    <AdminStatics
                        color="orange"
                        data="2 đơn hàng"
                        title="Đơn hàng"
                        icon={<FontAwesomeIcon icon={faTasks} />}
                        description="Số đơn hàng đang giao dịch"
                    />
                </div>
                <div className="w-full md:w-[33%] p-4">
                    <AdminStatics
                        color="yellow"
                        data="2 nhà cung cấp"
                        title="Nhà cung cấp"
                        icon={<FontAwesomeIcon icon={faIndustry} />}
                        description="Nhà cung cấp"
                    />
                </div>
                <div className="w-full md:w-[33%] p-4">
                    <AdminStatics
                        color="sky"
                        data="5 sản phẩm"
                        title="Sản phẩm"
                        icon={<FontAwesomeIcon icon={faLaptop} />}
                        description="Tổng sản phẩm"
                    />
                </div>
                <div className="w-full md:w-[33%] p-4">
                    <AdminStatics
                        color="purple"
                        data="8"
                        title="Thống kê hàng tồn"
                        icon={<FontAwesomeIcon icon={faWarehouse} />}
                        description="Thống kê hàng tồn"
                    />
                </div>
            </div>
        </div>
    );
}

export default AdminHomePage;
