import { Avatar } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
        field: 'stock',
        headerName: 'Số hàng tồn',
        width: 120,
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
        field: 'code',
        headerName: 'Chi tiết',
        width: 120,
        renderCell: (param) => {
            return (
                <>
                    <Link to={'/product/' + param.value}>
                        <span className="underline font-bold select-none hover:text-blue-700 text-blue-600">
                            Xem chi tiết
                        </span>
                    </Link>
                </>
            );
        },
    },
];

function ProductTable({ rows }) {
    const [rowsState, setRowsState] = useState(rows);
    return (
        <div style={{ height: 480, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} />
        </div>
    );
}

export default ProductTable;
