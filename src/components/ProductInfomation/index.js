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
import {
    faBriefcase,
    faGift,
    faHardDrive,
    faMemory,
    faMicrochip,
    faServer,
    faTools,
    faTv,
} from '@fortawesome/free-solid-svg-icons';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});
export default function ProductInfomation({
    showController = true,
    avatar,
    discounts = [],
    price,
    productCode,
    warrantyMonth,
}) {
    const [likedState, setLikedState] = useState(false);
    const [discountState, setDiscountState] = useState(0);
    const link = '/product/' + productCode;
    const url = window.location.origin + link;

    useEffect(() => {
        if (discounts.length > 0) {
            let total = 0;
            discounts.forEach((discount) => {
                total += discount.discountPercent;
            });
            setDiscountState(total);
        }
    }, [discounts]);

    console.log('discountState', discountState);

    return (
        <Card sx={{ width: '100%' }}>
            <CardContent style={{ paddingBottom: 0 }}>
                {avatar && (
                    <div className="w-full max-h-[300px] overflow-hidden">
                        <img className="w-full" alt="" src={avatar} />
                    </div>
                )}
                <h3 className="font-bold text-base md:text-lg hover:text-blue-500">
                    Asus TUF Gaming F15 FX506LHB-HN188W
                </h3>
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <p className="text-xl font-bold text-red-500">
                        {discountState > 0
                            ? formatter.format(price - price * (discountState / 100))
                            : formatter.format(price)}
                        <span className="text-gray-500 ml-4">
                            {discountState > 0 && <strike>{formatter.format(price)}</strike>}
                        </span>
                    </p>
                    {discountState > 0 && (
                        <p className="text-blue-500">
                            Giảm <b>{discountState}%</b>
                        </p>
                    )}
                </div>

                <ul className="bg-slate-100 rounded-lg p-2 text-gray-600 flex flex-col mt-2 text-sm sm:text-base">
                    <h2 className="font-bold">Khuyến mãi</h2>
                    {discounts.length > 0 ? (
                        discounts.map((discount, index) => {
                            return (
                                <li className="mr-[8px]">
                                    <FontAwesomeIcon className="mr-2" icon={faGift} />
                                    <span>
                                        <b>{discount.discountPercent}%</b> - {discount.name}
                                    </span>
                                </li>
                            );
                        })
                    ) : (
                        <div>Hiện đang không có khuyến mãi nào</div>
                    )}
                </ul>
                <div className="text-blue-600 font-bold my-2">
                    <FontAwesomeIcon icon={faTools} /> {warrantyMonth} tháng bảo hành
                </div>
            </CardContent>
            {showController && (
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
            )}
        </Card>
    );
}
