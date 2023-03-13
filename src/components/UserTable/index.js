import { Avatar, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SimpleDialog from '../SimpleDialog';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
        field: 'avatar',
        headerName: 'Hình ảnh',
        width: 80,
        renderCell: (param) => {
            return (
                <>
                    <Avatar src={param.value} variant="rounded" />
                </>
            );
        },
    },
    {
        field: 'username',
        headerName: 'Username',
        width: 200,
    },
    { field: 'fullname', headerName: 'Tên người dùng', width: 280 },
    {
        field: 'gender',
        headerName: 'Giới tính',
        width: 100,
    },
    {
        field: 'birthYear',
        headerName: 'Năm sinh',
        width: 120,
    },
    {
        field: 'usernameToBlock',
        headerName: 'Thao tác',
        width: 160,
        renderCell: (param) => {
            return (
                <>
                    <SimpleDialog
                        openButton={<Button color="error">Chặn</Button>}
                        title="Xác nhận chặn"
                        color="error"
                        agreeAction={(e) => {
                            console.log('chặn');
                        }}
                    >
                        <div className="p-4 px-10 min-w-[260px]">Chặn người dùng này?</div>
                    </SimpleDialog>
                </>
            );
        },
    },
];
const adminColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
        field: 'avatar',
        headerName: 'Hình ảnh',
        width: 80,
        renderCell: (param) => {
            return (
                <>
                    <Avatar src={param.value} variant="rounded" />
                </>
            );
        },
    },
    {
        field: 'username',
        headerName: 'Username',
        width: 200,
    },
    { field: 'fullname', headerName: 'Tên người dùng', width: 280 },
    {
        field: 'gender',
        headerName: 'Giới tính',
        width: 100,
    },
    {
        field: 'birthYear',
        headerName: 'Năm sinh',
        width: 120,
    },
];

function UserTable({ rows, isAdmin = false }) {
    const [rowsState, setRowsState] = useState(rows);
    return (
        <div style={{ height: 480, width: '100%' }}>
            <DataGrid rows={rowsState} columns={isAdmin ? adminColumns : columns} />
        </div>
    );
}

export default UserTable;
