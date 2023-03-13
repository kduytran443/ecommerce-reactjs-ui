import { Avatar, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SimpleDialog from '../OrderDialog';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
        field: 'image',
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
            return (
                <Link to={'/manufacturer/' + param.value}>
                    <span className="underline select-none hover:text-blue-700 text-blue-600">{param.value}</span>
                </Link>
            );
        },
    },
    {
        field: 'price',
        headerName: 'Giá',
        width: 120,
    },
    {
        field: 'discount',
        headerName: 'Giảm giá',
        width: 120,
    },
    {
        field: 'stock',
        headerName: 'Hàng tồn',
        width: 120,
    },
    {
        field: 'favorite',
        headerName: 'Yêu thích',
        width: 120,
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

function ProductViewOnlyTable({ rows }) {
    const [rowsState, setRowsState] = useState(rows);
    return (
        <div className="bg-white" style={{ height: 480, width: '100%' }}>
            <DataGrid rows={rowsState} columns={columns} />
        </div>
    );
}

export default ProductViewOnlyTable;
