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
import { Title } from '@mui/icons-material';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function RecipeReviewCard() {
    const [expanded, setExpanded] = useState(false);
    const [likedState, setLikedState] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ width: '100%' }}>
            <CardMedia
                component="img"
                height="194"
                image="https://product.hstatic.net/1000026716/product/khung-lt-van-phong_8a50518369b445f9a7adf816ceb90d6a_large.png"
                alt="Paella dish"
            />
            <CardContent>
                <h3>Laptop MSI Modern 14 C11M 011VN</h3>
                <Typography variant="body2" color="text.secondary">
                    <strike>22,990,000₫</strike>
                </Typography>
                <p className="text-xl font-bold pt-2 text-red-500">20,990,000₫</p>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton
                    onClick={(e) => {
                        setLikedState(!likedState);
                    }}
                    aria-label="add to favorites"
                    color={likedState ? 'error' : 'default'}
                >
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}
