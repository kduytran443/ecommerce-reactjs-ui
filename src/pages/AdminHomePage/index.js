import { faSalesforce } from '@fortawesome/free-brands-svg-icons';
import {
    faHeart,
    faIndustry,
    faLaptop,
    faList,
    faMoneyBill,
    faRetweet,
    faTasks,
    faUser,
    faWarehouse,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AdminStatics from '~/components/AdminStatics';
import WarehouseIcon from '@mui/icons-material/Warehouse';

function AdminHomePage() {
    return (
        <div className="w-full">
            <div className="w-full flex flex-col md:flex-row mt-4 items-center flex-wrap">
                <div className="w-full md:w-[33%] p-4">
                    <AdminStatics
                        color="bg-red-500 shadow-red-400"
                        data="Đơn hàng"
                        title="Quản lý"
                        icon={<FontAwesomeIcon icon={faTasks} />}
                        link="/admin/order"
                        description="Danh sách đơn hàng"
                    />
                </div>
                <div className="w-full md:w-[33%] p-4">
                    <AdminStatics
                        color="bg-lime-500 shadow-lime-400"
                        data="Danh mục"
                        title="Quản lý"
                        icon={<FontAwesomeIcon icon={faList} />}
                        description="Danh mục"
                        link="/admin/category"
                    />
                </div>
                <div className="w-full md:w-[33%] p-4">
                    <AdminStatics
                        color="bg-yellow-500 shadow-yellow-400"
                        data="Nhà sản xuất"
                        title="Quản lý"
                        icon={<FontAwesomeIcon icon={faIndustry} />}
                        description="Nhà sản xuất"
                        link="/admin/manufacturer"
                    />
                </div>
                <div className="w-full md:w-[33%] p-4">
                    <AdminStatics
                        color="bg-sky-500 shadow-sky-400"
                        data="Sản phẩm"
                        title="Quản lý"
                        icon={<FontAwesomeIcon icon={faLaptop} />}
                        description="Quản lý các sản phẩm"
                        link="/admin/product"
                    />
                </div>
                <div className="w-full md:w-[33%] p-4">
                    <AdminStatics
                        color="bg-purple-500 shadow-purple-400"
                        data="Hàng tồn"
                        title="Quản lý"
                        icon={<FontAwesomeIcon icon={faWarehouse} />}
                        description="Thống kê hàng tồn"
                        link="/admin/view-product"
                    />
                </div>
                <div className="w-full md:w-[33%] p-4">
                    <AdminStatics
                        color="bg-blue-500 shadow-blue-400"
                        data="Doanh thu"
                        title="Quản lý"
                        icon={<FontAwesomeIcon icon={faMoneyBill} />}
                        description="Doanh thu website"
                    />
                </div>
                <div className="w-full md:w-[33%] p-4">
                    <AdminStatics
                        color="bg-green-500 shadow-green-400"
                        data="Người dùng"
                        title="Quản lý"
                        icon={<FontAwesomeIcon icon={faUser} />}
                        description="Số người dùng đã đăng ký tài khoản"
                        link="/admin/user"
                    />
                </div>
                <div className="w-full md:w-[33%] p-4">
                    <AdminStatics
                        color="bg-red-500 shadow-red-400"
                        data="Sản phẩm yêu thích"
                        title="Quản lý"
                        icon={<FontAwesomeIcon icon={faHeart} />}
                        description="Số sản phẩm được yêu thích bởi người dùng"
                        link="/admin/view-product"
                    />
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-3xl font-black">Địa chỉ trụ sở</h2>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15715.366073286777!2d105.7706153!3d10.0299337!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0895a51d60719%3A0x9d76b0035f6d53d0!2sCan%20Tho%20University!5e0!3m2!1sen!2s!4v1678242634886!5m2!1sen!2s"
                    width="600"
                    height="450"
                    allowfullscreen=""
                    style={{ width: '100%' }}
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>
    );
}

export default AdminHomePage;
