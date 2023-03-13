import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, IconButton } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

function UploadImage({ callback, image = '' }) {
    const [imageState, setImageState] = useState(image);

    useEffect(() => {
        setImageState(image);
    }, [image]);

    const imageRef = useRef();

    const uploadImage = (e) => {
        const files = e.target.files;
        for (let i = 0; i < files.length; i++) {
            let file = e.target.files[i];
            if (file) {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    callback(reader.result);
                    setImageState(reader.result);
                    imageRef.current.value = '';
                };
                reader.onerror = (error) => {
                    console.log('error uploading!');
                };
            }
        }
    };

    return (
        <div className="group bg-slate-800 w-[300px] h-[300px] cursor-pointer relative duration-200 hover:shadow-md">
            <div>
                <Avatar
                    className="group-hover:opacity-80 duration-200"
                    src={imageState}
                    sx={{ width: '300px', height: '300px' }}
                    variant="square"
                />
                <div
                    onClick={(e) => {
                        imageRef.current.click();
                    }}
                    className="absolute bg-white rounded-full group-hover:opacity-100 opacity-0 duration-200 top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2"
                >
                    <IconButton sx={{ width: '80px', height: '80px' }} color="inherit" size="large">
                        <FontAwesomeIcon icon={faCamera} />
                    </IconButton>
                </div>
                <input type="file" onChange={uploadImage} style={{ display: 'none' }} ref={imageRef} />
            </div>
        </div>
    );
}

export default UploadImage;
