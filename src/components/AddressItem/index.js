import { faCheck, faPen, faTrash, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton, Snackbar, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { addressService } from '~/services/addressService';
import SimpleDialog from '../SimpleDialog';

function AddressItem({ content, id, putAction = () => {}, deleteAction = () => {} }) {
    const [addressState, setAddressState] = useState(content);
    const [edittingState, setEdittingState] = useState(false);

    useEffect(() => {
        setAddressState(content);
    }, [content]);

    return (
        <div className="p-4 flex flex-row items-center rounded border border-slate-200 justify-between">
            <div className="w-full">
                {edittingState ? (
                    <TextField
                        onInput={(e) => {
                            setAddressState(e.target.value);
                        }}
                        value={addressState}
                        className="w-full"
                    />
                ) : (
                    addressState
                )}
            </div>
            <div className="flex flex-row items-center">
                {!edittingState ? (
                    <>
                        {addressState.trim() && (
                            <div className="mr-4">
                                <IconButton
                                    onClick={(e) => {
                                        setEdittingState(true);
                                    }}
                                    size="small"
                                    color="primary"
                                >
                                    <FontAwesomeIcon icon={faPen} />
                                </IconButton>
                            </div>
                        )}
                        <div>
                            <IconButton
                                onClick={(e) => {
                                    deleteAction(id);
                                }}
                                size="small"
                                color="error"
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </IconButton>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="ml-2">
                            <IconButton
                                onClick={(e) => {
                                    putAction({
                                        id: id,
                                        details: addressState,
                                    });
                                    setEdittingState(false);
                                }}
                                size="small"
                                color="success"
                            >
                                <FontAwesomeIcon icon={faCheck} />
                            </IconButton>
                        </div>
                        <div className="ml-2">
                            <IconButton
                                onClick={(e) => {
                                    setAddressState(content);
                                    setEdittingState(false);
                                }}
                                size="small"
                                color="error"
                            >
                                <FontAwesomeIcon icon={faX} />
                            </IconButton>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default AddressItem;
