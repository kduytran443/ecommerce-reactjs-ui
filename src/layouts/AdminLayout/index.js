import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '~/stores/UserStore';
import AdminHeader from '../components/AdminHeader';
import AdminSidebarMenu from '../components/AdminSidebarMenu';
import SimpleFooter from '../components/SimpleFooter';
import { userService } from '~/services/userService';

function AdminLayout({ children }) {
    const [userDataState, setUserDataState] = useUser({});
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        userService.getUser().then((data) => {
            console.log('USER', data, !data.username, !data.role == 'ADMIN');
            if (!data.username || data.role !== 'ADMIN') {
                navigate('/login');
            }
        });
    }, [location]);
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
