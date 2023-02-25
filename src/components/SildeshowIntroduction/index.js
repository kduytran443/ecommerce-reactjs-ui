import { faArrowLeft, faArrowRight, faBackward } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, IconButton } from '@mui/material';
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
        url: 'https://pbs.twimg.com/media/Fn5zoRBWAAkgFj4.jpg',
        caption: 'Slide 1',
    },
    {
        url: 'https://www.anphatpc.com.vn/media/news/0308_asus_rog_strix_g15_g513_ryzen7_4800h_1.jpg',
        caption: 'Slide 2',
    },
    {
        url: 'https://laptop365.vn/pic/product/images/gigabyte-g5-11th-1_compressed-scaled-Laptop365.jpg',
        caption: 'Slide 3',
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

const SildeshowIntroduction = () => {
    return (
        <div className="slide-container md:rounded-lg md:overflow-hidden md:shadow-md">
            <Slide {...properties} transitionDuration={500}>
                {slideImages.map((slideImage, index) => (
                    <div key={index} className="hover:cursor-grab active:cursor-grabbing">
                        <div
                            style={{
                                ...divStyle,
                                backgroundImage: `url(${slideImage.url})`,
                                backgroundPosition: 'center',
                            }}
                        >
                            <span style={spanStyle}>{slideImage.caption}</span>
                        </div>
                    </div>
                ))}
            </Slide>
        </div>
    );
};

export default SildeshowIntroduction;
