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

export default function ProductInfomation() {
    const [likedState, setLikedState] = useState(false);

    return (
        <Card sx={{ width: '100%' }}>
            <CardContent style={{ paddingBottom: 0 }}>
                <h3 className="font-bold text-base md:text-lg hover:text-blue-500">Laptop MSI Modern 14 C11M 011VN</h3>
                <Typography variant="body2" color="text.secondary">
                    <strike>22,990,000₫</strike>
                </Typography>
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <p className="text-lg md:text-xl font-bold text-red-500">20,691,000₫</p>
                    <p className="text-blue-500">
                        <p>
                            Giảm <b>10%</b>
                        </p>
                        <p>(Còn hàng)</p>
                    </p>
                </div>
                <ul className="bg-slate-100 rounded-lg p-2 flex flex-col mt-2 text-sm sm:text-base">
                    <li className="mr-[8px]">
                        <FontAwesomeIcon className="mr-2" icon={faTv} />
                        <span>15.6 inch</span>
                    </li>
                    <li className="mr-[8px]">
                        <FontAwesomeIcon className="mr-2" icon={faMicrochip} />
                        <span>Core i5</span>
                    </li>
                    <li className="mr-[8px]">
                        <FontAwesomeIcon className="mr-2" icon={faMemory} />
                        <span>8 GB (1 thanh 8 GB)</span>
                    </li>
                    <li className="mr-[8px]">
                        <FontAwesomeIcon className="mr-2" icon={faHardDrive} />
                        <span>SSD 512 GB</span>
                    </li>
                    <li className="mr-[8px]">
                        <FontAwesomeIcon className="mr-2" icon={faServer} />
                        <span>NVIDIA GeForce GTX 1650 4GB</span>
                    </li>
                    <li className="mr-[8px]">
                        <FontAwesomeIcon className="mr-2" icon={faBriefcase} />
                        <span>2.3 kg</span>
                    </li>
                </ul>
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
