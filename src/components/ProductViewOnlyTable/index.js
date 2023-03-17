import { Avatar, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SimpleDialog from '../OrderDialog';

function ProductViewOnlyTable({ rows }) {
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
        { field: 'name', headerName: 'Tên SP', width: 320 },
        {
            field: 'manufacturer',
            headerName: 'Hãng',
            width: 120,
            renderCell: (param) => {
                return <span className="select-none hover:text-blue-700 text-blue-600">{param.value.name}</span>;
            },
        },
        {
            field: 'price',
            headerName: 'Giá',
            width: 120,
        },
        {
            field: 'discounts',
            headerName: 'Giảm giá',
            width: 120,
            renderCell: (param) => {
                let discount = 0;
                const discountArr = param.value;
                const date = new Date();
                discountArr.forEach((item) => {
                    if (date.getTime() > item.startTime && date.getTime() < item.endTime) {
                        discount += item.discountPercent;
                    }
                });
                return <span className="select-none hover:text-blue-700 text-blue-600">{discount}</span>;
            },
        },
        {
            field: 'stock',
            headerName: 'Hàng tồn',
            width: 120,
        },
        {
            field: 'favorited',
            headerName: 'Yêu thích',
            width: 120,
        },
        {
            field: 'revenue',
            headerName: 'Doanh thu',
            width: 120,
            renderCell: (param) => {
                if (param.value < 0) {
                    return <span className="select-none hover:text-red-700 text-red-600">{param.value}</span>;
                } else return <span className="select-none hover:text-green-700 text-green-600">{param.value}</span>;
            },
        },
        {
            field: 'code',
            headerName: 'Thao tác',
            width: 160,
            renderCell: (param) => {
                return (
                    <Link to={'/product/' + param.value}>
                        <div className="font-bold text-blue-500 shadow-blue-300 underline">Xem sản phẩm</div>
                    </Link>
                );
            },
        },
    ];

    return (
        <div className="bg-white" style={{ height: 480, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} />
        </div>
    );
}

export default ProductViewOnlyTable;
