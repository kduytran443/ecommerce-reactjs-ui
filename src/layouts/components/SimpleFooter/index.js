import { faFacebook, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton, Tooltip } from '@mui/material';

function SimpleFooter() {
    return (
        <div className="bg-gray-900 text-white w-full p-4 pb-6 flex flex-col sm:flex-row items-center sm:items-start justify-center border-slate-200 border-t-[1px]">
            <div className="flex flex-row items-center justify-center">
                <div>
                    <div className="flex flex-row items-center">
                        <div className="p-2 mr-2">
                            <div className="font-black text-3xl text-red-500">TMĐT</div>
                        </div>
                        <b className="text-lg">Nền tảng mua sắm</b>
                    </div>
                    <p className="text-gray-300">
                        <p>Điện thoại: 0919.639.671 (Nhóm trưởng)</p>
                        <p>Email: nhom14@student.ctu.edu.vn</p>
                        <p>Địa chỉ: Khu II, Đ. 3/2, Xuân Khánh, Ninh Kiều, Cần Thơ</p>
                    </p>
                </div>
            </div>
            <div className="flex mt-6 sm:mt-0 flex-col sm:flex-row items-center justify-center">
                <span>Theo dõi chúng tôi qua</span>
                <div className="ml-0 sm:ml-8">
                    <Tooltip title="Facebook">
                        <IconButton color="inherit">
                            <FontAwesomeIcon icon={faFacebook} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Youtube">
                        <IconButton color="error">
                            <FontAwesomeIcon icon={faYoutube} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Twitter">
                        <IconButton color="primary">
                            <FontAwesomeIcon icon={faTwitter} />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
}

export default SimpleFooter;
