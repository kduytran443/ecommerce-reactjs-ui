import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '@mui/material';
import AddressItem from '../AddressItem';

function Address({ list = [] }) {
    return (
        <div className="flex flex-col w-full">
            <h2 className="font-bold text-xl ml-2">Địa chỉ</h2>
            {list.map((item) => {
                return <AddressItem content={item.content} />;
            })}
        </div>
    );
}

export default Address;
