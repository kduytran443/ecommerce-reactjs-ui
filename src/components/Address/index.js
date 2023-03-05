import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '@mui/material';
import AddressItem from '../AddressItem';

function Address({ list = [] }) {
    return (
        <div className="flexflex-col w-full">
            <h2 className="font-bold text-xl ml-2">Địa chỉ</h2>
            {list.map((item) => {
                return (
                    <div className="my-2 hover:bg-slate-100">
                        <AddressItem content={item.content} />
                    </div>
                );
            })}
        </div>
    );
}

export default Address;
