import { faCheckCircle, faUser, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from 'react';

function Category({
    image = 'https://images.fpt.shop/unsafe/fit-in/60x60/filters:quality(90):fill(transparent)/fptshop.com.vn/Uploads/images/2022/iconcate/icon-laptop.png',
    color = 'slate',
    name = 'title',
    data = 'data',
    code = 'admin',
    description = '',
}) {
    const navigate = useNavigate();
    const [categoryState, setCategoryState] = useState({
        id: 1,
        name: name,
        code: code,
        products: 5,
    });

    const [visibleEditing, setVisibleEditing] = useState(false);

    const submitEdit = (e) => {
        if (!categoryState.name.trim()) {
        }
        setVisibleEditing(false);
    };

    const onInput = (e) => {
        if (categoryState) {
            setCategoryState((pre) => {
                return { ...pre, name: e.target.value };
            });
        }
    };

    const cancel = (e) => {
        setCategoryState((pre) => {
            return { ...pre, name: name };
        });
        setVisibleEditing(false);
    };

    return (
        <div className="w-full flex flex-col shadow-lg p-6 bg-white rounded-lg group">
            <div
                onClick={(e) => {
                    navigate('/admin/category/' + categoryState.code);
                }}
                className="w-full cursor-pointer flex flex-row items-center justify-between "
            >
                <div
                    className={
                        'relative group-hover:bg-blue-500 duration-200 group-hover:shadow-blue-400 aspect-ratio w-[64px] p-4 absolute -top-[32px] shadow-md rounded-xl flex flex-col justify-center items-center ' +
                        color
                    }
                >
                    <div className="group-hover:animate-bounce duration-200 text-white font-bold text-3xl overflow-hidden">
                        <img alt="img" src={image} />
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <p className="text-gray-500">{categoryState.name}</p>
                    <p className="text-xl font-bold">{data}</p>
                </div>
            </div>
            <div className="border-t border-slate-300 mt-4 text-gray-500 p-2 h-[100px] overflow-y-auto">
                {description}
            </div>
        </div>
    );
}

export default Category;
