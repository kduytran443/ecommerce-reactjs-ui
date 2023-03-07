import { LinearProgress, Rating } from '@mui/material';
import { Box } from '@mui/system';

function ReviewTable({ children }) {
    return (
        <div className="w-full border border-slate-300 p-4 rounded-2xl shadow-lg">
            <h1 className="text-xl font-bold">Đánh giá</h1>
            <div className="flex flex-row items-center justify-between my-4">
                <Rating name="half-rating-read" defaultValue={5} precision={1} readOnly />
                <div>1 người đã đánh giá</div>
            </div>
            <div className="w-full">{children}</div>
        </div>
    );
}

export default ReviewTable;
