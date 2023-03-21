import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SimpleAccordion from '~/components/SimpleAccordion';
import UserTable from '~/components/UserTable';
import { userService } from '~/services/userService';
import AdminCreateUserDialog from './AdminCreateUserDialog';

function AdminUserPage() {
    const [adminListState, setAdminListState] = useState([
        {
            id: 1,
            username: 'b1906443',
            fullname: 'Trần Khánh Duy',
            avatar: 'https://lh3.googleusercontent.com/a/AGNmyxbF4s1VsKL_bt0LtB2rZyMcvQLi8zfEmY6Vlf1M=s50-c-k-no',
            gender: 'male',
            birthYear: 2001,
            usernameToBlock: 'b1906443',
        },
        {
            id: 2,
            username: 'b1906515',
            fullname: 'Nguyễn Hữu Lộc',
            avatar: 'https://lh3.googleusercontent.com/a-/ACB-R5QN59Zoir-hx_1YzCvA1catpAsLI7BDfogKXWZ2=s50-c-k-no',
            gender: 'male',
            birthYear: 2001,
            usernameToBlock: 'b1906515',
        },
    ]);

    const [userListState, setUserListState] = useState([
        {
            id: 1,
        },
    ]);

    //avatar, username, fullname, password, gender, birthYear
    const [newAdminDataState, setNewAdminDataState] = useState({
        avatar: '',
        username: '',
        fullname: '',
        password: '',
        gender: '',
        birthYear: '',
    });

    const [repasswordState, setRepasswordState] = useState('');

    const onInputNewAdmin = (property, value) => {
        setNewAdminDataState((pre) => {
            return { ...pre, [property]: value };
        });
    };

    const loadData = () => {
        userService.getAllUser().then((data) => {
            if (data.length >= 0) {
                const adminArr = data.filter((item) => item.role === 'ADMIN' && item.status === 1);
                const userArr = data
                    .filter((item) => item.role === 'USER' && item.status === 1)
                    .map((item) => {
                        item.usernameToBlock = item.username;
                        return item;
                    });
                setAdminListState(adminArr);
                setUserListState(userArr);
            }
        });
    };

    const location = useLocation();

    useEffect(() => {
        loadData();
    }, [location]);

    return (
        <div>
            <AdminCreateUserDialog />
            <div className="bg-white rounded">
                <h1 className="text-xl font-bold mt-8 p-2">Admin</h1>
                <UserTable rows={adminListState} isAdmin />
            </div>
            <div className="bg-white rounded">
                <h1 className="text-xl font-bold mt-8 p-2">User</h1>
                <UserTable rows={userListState} loadData={loadData} />
            </div>
        </div>
    );
}

export default AdminUserPage;
