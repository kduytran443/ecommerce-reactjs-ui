import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from 'react';
import { SpaOutlined, Title } from '@mui/icons-material';
import CustomizedSnackbars from '../CustomizedSnackbars';
import { Link } from 'react-router-dom';
import { HOME_PAGE_URL } from '~/constants';
import { Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faHardDrive, faMemory, faMicrochip, faServer, faTv } from '@fortawesome/free-solid-svg-icons';
import ProductStatistics from '../ProductStatistics';
import { VND } from '~/utils/VND';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

export default function RecipeReviewCard({
    productCode = '',
    name = 'Tên sản phẩm',
    discounts = [],
    price = 0,
    image = 'https://images.fpt.shop/unsafe/fit-in/240x215/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/8/4/637952089606431911_asus-vivobook-a1503-bac-dd.jpg',
}) {
    const link = '/product/' + productCode;
    const [likedState, setLikedState] = useState(false);
    const url = window.location.origin + link;

    const [discountState, setDiscountState] = useState({});

    useEffect(() => {
        console.log('discounts', discounts);
        if (discounts.length > 0) {
            const max = discounts.reduce((prev, current) => {
                return prev.discountPercent > current.discountPercent ? prev : current;
            });
            console.log('max ', max);
            setDiscountState(max ? max : {});
        }
    }, [discounts]);

    return (
        <Card sx={{ width: '100%' }} className={'flex flex-col justify-between'}>
            <Link to={link}>
                <div className="group relative top-0 left-0 hover:shadow-md duration-200">
                    <div className="absolute w-full h-full top-0 left-0 duration-200 opacity-0 group-hover:opacity-100">
                        <div className="absolute top-0 left-0 bg-black w-full h-full opacity-30"></div>
                        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-white font-semibold">
                            Bấm vào để xem chi tiết sản phẩm
                        </div>
                    </div>
                    <CardMedia component="img" height="194" image={image} alt="img" />
                </div>
            </Link>
            <div className="my-2">
                <CardContent style={{ paddingBottom: 0 }}>
                    <Link to={link}>
                        <h3 className="font-bold text-base md:text-lg hover:text-blue-500">{name}</h3>
                    </Link>
                    <div className="flex flex-col md:flex-row items-center justify-between mt-2">
                        <p className="text-xl font-bold text-red-500">
                            {formatter.format(price - price * (discountState.discountPercent / 100))}
                            <span className="text-gray-500 ml-4">
                                {discountState.discountPercent > 0 && <strike>{formatter.format(price)}</strike>}
                            </span>
                        </p>
                        <p className="text-blue-500">
                            Giảm <b>{discountState.discountPercent}%</b>
                        </p>
                    </div>
                </CardContent>
            </div>
            <CardActions disableSpacing style={{ paddingTop: 0 }}>
                <div className="flex flex-row justify-end items-end w-full">
                    <CustomizedSnackbars
                        openButton={
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                        }
                        message={'Sao chép liên kết thành công'}
                        actionAfterClick={() => {
                            navigator.clipboard.writeText(url);
                        }}
                    />
                    <IconButton
                        onClick={(e) => {
                            setLikedState(!likedState);
                        }}
                        aria-label="add to favorites"
                        color={likedState ? 'error' : 'default'}
                    >
                        <FavoriteIcon />
                    </IconButton>
                </div>
            </CardActions>
        </Card>
    );
}
