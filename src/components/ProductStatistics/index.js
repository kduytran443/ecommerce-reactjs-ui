import { faBriefcase, faHardDrive, faMemory, faMicrochip, faServer, faTv } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ProductStatistics({ mt = 2 }) {
    return (
        <ul className={`bg-slate-100 rounded-lg p-2 flex flex-row flex-wrap mt-${mt} text-sm sm:text-base`}>
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
    );
}

export default ProductStatistics;
