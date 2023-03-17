import { faCamera, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Button, IconButton, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DeleteManufacturer from '~/pages/AdminManufacturerPage/DeleteManufacturer';
import SimpleDialog from '../OrderDialog';

//id, avatar, name, code

function ManufacturerTable({ rows, getId = () => {}, reload = () => {} }) {
    const [selectedDataState, setSelectedDataState] = useState({
        id: 5,
        name: 'MSI',
        code: 'msi',
        avatar: 'https://inkythuatso.com/uploads/images/2021/10/dell-logo-inkythuatso-4-01-30-10-17-55.jpg',
    });

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'logo',
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
        { field: 'name', headerName: 'Tên nhà cung cấp', width: 320 },
        {
            field: 'code',
            headerName: 'Thao tác',
            width: 200,
            renderCell: (param) => {
                return (
                    <div className="flex flex-row items-center">
                        <Link to={'/admin/manufacturer-details/' + param.value}>
                            <Button color="primary">Sửa</Button>
                        </Link>
                        <DeleteManufacturer code={param.value} reLoad={reload} />
                    </div>
                );
            },
        },
    ];

    return (
        <div style={{ height: 420, width: '100%' }}>
            <DataGrid onCellClick={getId} rows={rows} columns={columns} />
        </div>
    );
}

export default ManufacturerTable;
