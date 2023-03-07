import AdminHeader from '../components/AdminHeader';
import AdminSidebarMenu from '../components/AdminSidebarMenu';
import SimpleFooter from '../components/SimpleFooter';

function AdminLayout({ children }) {
    return (
        <div className="flex flex-col min-h-[100vh]">
            <AdminHeader />
            <div className="flex flex-row items-stretch flex-1">
                <div className="w-[96px] md:flex flex-col hidden items-center shadow-md">
                    <div className="flex-1 fixed">
                        <AdminSidebarMenu />
                    </div>
                </div>
                <div className="flex flex-col max-w-full flex-1 w-full md:w-[calc(100%-96px)] p-0 md:p-6 bg-gray-100">
                    {children}
                </div>
            </div>
            <SimpleFooter />
        </div>
    );
}

export default AdminLayout;
