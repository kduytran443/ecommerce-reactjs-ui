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
import { useState } from 'react';
import { SpaOutlined, Title } from '@mui/icons-material';
import CustomizedSnackbars from '../CustomizedSnackbars';
import { Link } from 'react-router-dom';
import { HOME_PAGE_URL } from '~/constants';
import { Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faHardDrive, faMemory, faMicrochip, faServer, faTv } from '@fortawesome/free-solid-svg-icons';
import ProductStatistics from '../ProductStatistics';

export default function RecipeReviewCard({ productCode = HOME_PAGE_URL }) {
    const [likedState, setLikedState] = useState(false);

    return (
        <Card sx={{ width: '100%' }} className={'flex flex-col justify-between'}>
            <Link to={productCode}>
                <div className="group relative top-0 left-0 hover:shadow-md duration-200">
                    <div className="absolute w-full h-full top-0 left-0 duration-200 opacity-0 group-hover:opacity-100">
                        <div className="absolute top-0 left-0 bg-black w-full h-full opacity-30"></div>
                        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-white font-semibold">
                            Bấm vào để xem chi tiết sản phẩm
                        </div>
                    </div>
                    <CardMedia
                        component="img"
                        height="194"
                        image="https://images.fpt.shop/unsafe/fit-in/240x215/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/8/4/637952089606431911_asus-vivobook-a1503-bac-dd.jpg"
                        alt="Paella dish"
                    />
                </div>
            </Link>
            <CardContent style={{ paddingBottom: 0 }}>
                <Link to={productCode}>
                    <h3 className="font-bold text-base md:text-lg hover:text-blue-500">
                        Laptop MSI Modern 14 C11M 011VN
                    </h3>
                </Link>
                <Typography variant="body2" color="text.secondary">
                    <strike>22,990,000₫</strike>
                </Typography>
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <p className="text-lg md:text-xl font-bold text-red-500">20,691,000₫</p>
                    <p className="text-blue-500">
                        Giảm <b>10%</b>
                    </p>
                </div>
                <ProductStatistics />
            </CardContent>
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
                            navigator.clipboard.writeText('Laptop MSI Modern 14 C11M 011VN');
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
