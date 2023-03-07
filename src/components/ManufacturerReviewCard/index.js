import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ManufacturerReviewCard({
    name = 'Tên nhà sản xuất',
    code = 'asus',
    image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/ASUS_Logo.svg/2560px-ASUS_Logo.svg.png',
}) {
    const navigate = useNavigate();

    return (
        <div
            onClick={(e) => {
                navigate('/manufacturer/' + code);
            }}
            className="w-full select-none cursor-pointer hover:bg-slate-200 bg-slate-100 duration-100 flex flex-row items-center border border-slate-300 rounded-xl p-4"
        >
            <div>
                <Avatar src={image} sx={{ width: '64px', height: '64px' }} />
            </div>
            <div className="flex-1 flex flex-col ml-4 text-xl">
                <div className="font-bold">{name}</div>
                <div className="text-lg text-gray-600">@{code}</div>
            </div>
        </div>
    );
}

export default ManufacturerReviewCard;
