import { faCheckCircle, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton, TextField } from '@mui/material';
import { useState } from 'react';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SimpleDialog from '../OrderDialog';

function Specification({ name, id, deleteAction = () => {}, editAction = () => {} }) {
    const [dataState, setDataState] = useState({
        name: name,
    });

    const [visibleEditing, setVisibleEditing] = useState(false);

    const onInput = (e) => {
        setDataState({ name: e.target.value });
    };

    const cancel = (e) => {
        setDataState({ name: name });
        setVisibleEditing(false);
    };

    const submitEdit = () => {
        editAction({ id: id, name: dataState.name });
        setVisibleEditing(false);
    };

    return (
        <div className="w-full flex flex-row items-center">
            <div className="w-full">
                {visibleEditing ? (
                    <TextField label="Tên danh mục" className="w-full" value={dataState.name} onInput={onInput} />
                ) : (
                    <div>{dataState.name}</div>
                )}
            </div>
            {visibleEditing ? (
                <>
                    {dataState.name && dataState.name.trim() && (
                        <IconButton onClick={submitEdit} color="primary">
                            <FontAwesomeIcon icon={faCheckCircle} />
                        </IconButton>
                    )}
                    <IconButton onClick={cancel} color="error">
                        <FontAwesomeIcon icon={faXmarkCircle} />
                    </IconButton>
                </>
            ) : (
                <>
                    <IconButton
                        color="primary"
                        onClick={(e) => {
                            setVisibleEditing(true);
                        }}
                    >
                        <DriveFileRenameOutlineIcon />
                    </IconButton>
                    <SimpleDialog
                        openButton={
                            <IconButton color="error" onClick={submitEdit}>
                                <DeleteForeverIcon />
                            </IconButton>
                        }
                        title={'Xác nhận xóa?'}
                        agreeAction={() => {
                            deleteAction({ id: id });
                        }}
                        color="error"
                    >
                        <div className="py-4 px-8">Bạn có đồng ý xóa không?</div>
                    </SimpleDialog>
                </>
            )}
        </div>
    );
}

export default Specification;
