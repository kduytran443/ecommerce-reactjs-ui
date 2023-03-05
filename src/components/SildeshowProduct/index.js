import { faArrowLeft, faArrowRight, faBackward } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, IconButton } from '@mui/material';
import { useState } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const spanStyle = {
    padding: '20px',
    background: '#efefef',
    color: '#000000',
};

const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: '400px',
};

const slideImages = [
    {
        url: 'https://youtu.be/2rNuSSukpDk',
        type: 'youtube',
    },
    {
        url: 'https://nguyencongpc.vn/photos/17/ASUS-TUF-Gaming-F15-FX506HC-HN002T-9.jpg',
        type: 'img',
    },
    {
        url: 'https://cdn-amz.woka.io/images/I/91MW2X7lrfL.jpg',
        type: 'img',
    },
    {
        url: 'https://laptop123.com.vn/upload/product/laptop-asus-tuf-gaming-f15-fx506hc-hn001t-core-i7-11800h.png',
        type: 'img',
    },
    {
        url: 'https://tuanphong.vn/pictures/full/2021/09/1632463687-420-nang-cap-ssd-ram-cho-laptop-asus-tuf-gaming-f15-fx506-2021-7.jpg',
        type: 'img',
    },
];

const properties = {
    prevArrow: (
        <Button sx={{ width: '48px', height: '48px', borderRadius: '9999' }} variant="outlined">
            <FontAwesomeIcon className="text-xl" icon={faArrowLeft} />
        </Button>
    ),
    nextArrow: (
        <Button sx={{ width: '48px', height: '48px', borderRadius: '9999' }} variant="outlined">
            <FontAwesomeIcon className="text-xl" icon={faArrowRight} />
        </Button>
    ),
};

const SildeshowProduct = () => {
    return (
        <div className="slide-container md:rounded-lg md:overflow-hidden md:shadow-md select-none">
            <Slide autoplay={false} {...properties} transitionDuration={500}>
                {slideImages.map((item, index) => (
                    <div key={index} className="hover:cursor-grab active:cursor-grabbing">
                        <div
                            style={{
                                ...divStyle,
                                backgroundImage: `url(${item.url})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                            }}
                        >
                            {item.type === 'youtube' && (
                                <iframe
                                    width="1584"
                                    height="620"
                                    src="https://www.youtube.com/embed/2rNuSSukpDk?rel=0&showinfo=0&controls=0"
                                    title="Review"
                                    frameborder="0"
                                ></iframe>
                            )}
                        </div>
                    </div>
                ))}
            </Slide>
        </div>
    );
};

export default SildeshowProduct;
