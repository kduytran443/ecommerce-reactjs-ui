import { faArrowAltCircleRight, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { PERSONAL_PAGE_URL } from '~/constants';

function Line({ title }) {
    return (
        <div className="p-4 bg-red-600 shadow-md rounded flex flex-col md:flex-row justify-between">
            <p className="text-2xl font-bold text-white uppercase text-center md:text-left">{title}</p>
            <Link to={PERSONAL_PAGE_URL}>
                <div className="text-white hover:underline font-bold flex flex-row items-center justify-center">
                    <span>Xem tất cả</span>
                    <FontAwesomeIcon icon={faArrowAltCircleRight} className="ml-2" />
                </div>
            </Link>
        </div>
    );
}

export default Line;
