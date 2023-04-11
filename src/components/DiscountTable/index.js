import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { renderToTime } from '~/utils';
import DeleteDiscountDialog from './DeleteDiscountDialog';
import EditDiscountDialog from './EditDiscountDialog';

function DiscountTable({ data = [], reload = () => {} }) {
    const columns = [
        {
            field: 'name',
            headerName: 'Tên',
            width: 180,
        },
        {
            field: 'discountPercent',
            headerName: 'Tỉ lệ giảm',
            width: 130,
            renderCell: (param) => {
                return <>{param.value}%</>;
            },
        },
        {
            field: 'startTime',
            headerName: 'Bắt đầu',
            width: 150,
            renderCell: (param) => {
                return <>{renderToTime(param.value)}</>;
            },
        },
        {
            field: 'endTime',
            headerName: 'Kết thúc',
            width: 150,
            renderCell: (param) => {
                return <>{renderToTime(param.value)}</>;
            },
        },
        {
            field: 'id',
            headerName: 'Thao tác',
            width: 200,
            renderCell: (param) => {
                return (
                    <>
                        <EditDiscountDialog discountId={param.value} reload={reload} />
                        <DeleteDiscountDialog discountId={param.value} reload={reload} />
                    </>
                );
            },
        },
    ];

    return (
        <div>
            <div style={{ height: 280, width: '100%' }}>
                <DataGrid rows={data} columns={columns} />
            </div>
        </div>
    );
}

export default DiscountTable;
