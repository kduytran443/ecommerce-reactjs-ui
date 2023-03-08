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
                        data="2 đơn hàng"
                        title="Đơn hàng cần xử lý"
                        icon={<FontAwesomeIcon icon={faTasks} />}
                        link="/admin/order"
                        description="Đơn hàng cần xử lý"
                    />
                </div>
                <div className="w-full md:w-[33%] p-4">
                    <AdminStatics
                        color="bg-orange-500 shadow-orange-400"
                        data="2"
                        title="Đổi trả hàng"
                        icon={<FontAwesomeIcon icon={faRetweet} />}
                        description="Yêu cầu đổi trả hàng"
                    />
                </div>
                <div className="w-full md:w-[33%] p-4">
                    <AdminStatics
                        color="bg-lime-500 shadow-lime-400"
                        data="3"
                        title="Danh mục"
                        icon={<FontAwesomeIcon icon={faList} />}
                        description="Danh mục"
                        link="/admin/category"
                    />
                </div>
                <div className="w-full md:w-[33%] p-4">
                    <AdminStatics
                        color="bg-yellow-500 shadow-yellow-400"
                        data="2 nhà cung cấp"
                        title="Nhà cung cấp"
                        icon={<FontAwesomeIcon icon={faIndustry} />}
                        description="Nhà cung cấp"
                    />
                </div>
                <div className="w-full md:w-[33%] p-4">
                    <AdminStatics
                        color="bg-sky-500 shadow-sky-400"
                        data="5 sản phẩm"
                        title="Sản phẩm"
                        icon={<FontAwesomeIcon icon={faLaptop} />}
                        description="Tổng sản phẩm"
                    />
                </div>
                <div className="w-full md:w-[33%] p-4">
                    <AdminStatics
                        color="bg-purple-500 shadow-purple-400"
                        data="8"
                        title="Thống kê hàng tồn"
                        icon={<FontAwesomeIcon icon={faWarehouse} />}
                        description="Thống kê hàng tồn"
                    />
                </div>
                <div className="w-full md:w-[33%] p-4">
                    <AdminStatics
                        color="bg-blue-500 shadow-blue-400"
                        data="26.5 tr"
                        title="Doanh thu"
                        icon={<FontAwesomeIcon icon={faMoneyBill} />}
                        description="Doanh thu website"
                    />
                </div>
                <div className="w-full md:w-[33%] p-4">
                    <AdminStatics
                        color="bg-green-500 shadow-green-400"
                        data="10 người"
                        title="Người dùng"
                        icon={<FontAwesomeIcon icon={faUser} />}
                        description="Số người dùng đã đăng ký tài khoản"
                    />
                </div>
                <div className="w-full md:w-[33%] p-4">
                    <AdminStatics
                        color="bg-red-500 shadow-red-400"
                        data="5 sản phẩm"
                        title="Sản phẩm yêu thích"
                        icon={<FontAwesomeIcon icon={faHeart} />}
                        description="Số sản phẩm được yêu thích bởi người dùng"
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
