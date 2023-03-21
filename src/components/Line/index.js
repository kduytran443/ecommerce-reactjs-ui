import { faArrowAltCircleRight, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { CATEGORY_PAGE_URL, PERSONAL_PAGE_URL } from '~/constants';

function Line({ title, code }) {
    return (
        <div className="p-4 shadow shadow-red-300 bg-red-600 shadow-md sm:rounded flex flex-col md:flex-row justify-between">
            <p className="text-2xl font-bold text-white uppercase text-center md:text-left tracking-widest">{title}</p>
            <Link to={'/category/' + code}>
                <div className="text-white hover:underline font-bold flex flex-row items-center justify-center">
                    <span>Xem tất cả</span>
                    <FontAwesomeIcon icon={faArrowAltCircleRight} className="ml-2" />
                </div>
            </Link>
        </div>
    );
}

export default Line;
