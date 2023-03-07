import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function AdminStatics({
    icon = <FontAwesomeIcon icon={faUser} />,
    color = 'slate',
    title = 'title',
    data = 'data',
    description = 'Mô tả',
}) {
    return (
        <div className="w-full flex flex-col shadow-lg p-6 bg-white rounded-lg">
            <div className="w-full flex flex-row items-center justify-between ">
                <div
                    className={`relative aspect-ratio w-[64px] p-4 absolute -top-[32px] bg-${color}-500 shadow-${color}-400 shadow-md rounded-xl flex flex-col justify-center items-center`}
                >
                    <div className="text-white font-bold text-3xl">{icon}</div>
                </div>
                <div className="flex flex-col items-end">
                    <p className="text-gray-500">{title}</p>
                    <p className="text-xl font-bold">{data}</p>
                </div>
            </div>
            <div className="border-t border-slate-200 mt-2 p-2 pt-4 pb-0 text-gray-500">{description}</div>
        </div>
    );
}

export default AdminStatics;
