import { faReply } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Button, Rating } from '@mui/material';

function CommentCard({
    username = 'Ẩn danh',
    fullname = 'Ẩn danh',
    avatar,
    comment = 'Nội dung comment',
    date = Date.now(),
}) {
    let createdDate = new Date(date);

    return (
        <div className="flex flex-col w-full p-6 my-2 rounded-lg border border-slate-200">
            <div className="flex flex-col sm:flex-row justify-start items-center">
                <div className="flex flex-row justify-center items-center mb-2 sm:mb-0">
                    <Avatar src={avatar} sx={{ width: '48px', height: '48px' }} />
                    <h3 className="text-lg font-bold ml-4">{fullname}</h3>
                </div>
                <div className="ml-8">{`${createdDate.getDate()}/${
                    createdDate.getMonth() + 1
                }/${createdDate.getFullYear()} ${createdDate.getHours()}:${createdDate.getMinutes()}`}</div>
            </div>
            <p className="mt-4">{comment}</p>
            <div className="mt-4">
                <Button size="small" endIcon={<FontAwesomeIcon icon={faReply} />}>
                    Trả lời
                </Button>
            </div>
        </div>
    );
}

export default CommentCard;
