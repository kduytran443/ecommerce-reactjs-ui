import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextField } from '@mui/material';
import { useState } from 'react';
import SimpleAccordion from '~/components/SimpleAccordion';
import UserTable from '~/components/UserTable';

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

    return (
        <div>
            <SimpleAccordion title="Tạo admin">
                <div className="flex flex-col w-full">
                    <div className="my-2">
                        <TextField
                            value={newAdminDataState.username}
                            className="w-full"
                            onInput={(e) => {
                                onInputNewAdmin('username', e.target.value);
                            }}
                            label="Username"
                        />
                    </div>
                    <div className="my-2">
                        <TextField
                            value={newAdminDataState.password}
                            className="w-full"
                            onInput={(e) => {
                                onInputNewAdmin('password', e.target.value);
                            }}
                            label="Password"
                        />
                    </div>
                    <div className="my-2">
                        <TextField
                            value={repasswordState}
                            className="w-full"
                            onInput={(e) => {
                                setRepasswordState(e.target.value);
                            }}
                            label="Nhập lại password"
                        />
                    </div>
                    <div className="my-2">
                        <TextField
                            value={newAdminDataState.fullname}
                            className="w-full"
                            onInput={(e) => {
                                onInputNewAdmin('fullname', e.target.value);
                            }}
                            label="Họ và tên"
                        />
                    </div>
                    <div className="my-2">
                        <TextField
                            value={newAdminDataState.birthYear}
                            className="w-full"
                            onInput={(e) => {
                                onInputNewAdmin('birthYear', e.target.value);
                            }}
                            label="Năm sinh"
                        />
                    </div>
                    <div className="w-full mt-4">
                        <div className="w-full p-4 rounded-lg hover:bg-blue-600 active:bg-blue-700 text-center bg-blue-500 shadow-blue-300 shadow-lg cursor-pointer select-none text-white font-bold text-xl">
                            <FontAwesomeIcon icon={faAdd} /> Tạo Admin
                        </div>
                    </div>
                </div>
            </SimpleAccordion>
            <div className="bg-white rounded">
                <h1 className="text-xl font-bold mt-8 p-2">Admin</h1>
                <UserTable rows={adminListState} isAdmin />
            </div>
            <div className="bg-white rounded">
                <h1 className="text-xl font-bold mt-8 p-2">User</h1>
                <UserTable rows={userListState} />
            </div>
        </div>
    );
}

export default AdminUserPage;
