import { Avatar, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import BlockUserDialog from '../BlockUserDialog';
import SimpleDialog from '../SimpleDialog';

function UserTable({ rows, isAdmin = false, loadData = () => {} }) {
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
            field: 'brithYear',
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
                        <BlockUserDialog reload={loadData} usernameToBlock={param.value} />
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
            field: 'brithYear',
            headerName: 'Năm sinh',
            width: 120,
        },
    ];

    return (
        <div style={{ height: 480, width: '100%' }}>
            <DataGrid rows={rows} columns={isAdmin ? adminColumns : columns} />
        </div>
    );
}

export default UserTable;
