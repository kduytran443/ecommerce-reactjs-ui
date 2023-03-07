import { useState } from 'react';
import CommentCard from '~/components/CommentCard';
import ProductInfomation from '~/components/ProductInfomation';
import RecipeReviewCard from '~/components/RecipeReviewCard';
import SildeshowProduct from '~/components/SildeshowProduct';
import parse from 'html-react-parser';
import TemporaryDrawer from '~/components/TemporaryDrawer';
import CustomizedSnackbars from '~/components/CustomizedSnackbars';
import OrderDialog from '~/components/OrderDialog';
import ComplexAccordion from '~/components/ComplexAccordion';
import ProductStatistics from '~/components/ProductStatistics';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faComment, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import LoadingProcess from '~/components/LoadingProcess';
import { Box } from '@mui/system';
import { Button, Tab, TextField } from '@mui/material';
import ReviewCard from '~/components/ReviewCard';
import Line from '~/components/Line';
import { TabContext, TabList } from '@mui/lab';
import ManufacturerReviewCard from '~/components/ManufacturerReviewCard';
import ReviewTable from '~/components/ReviewTable';

const content = `<div class="st-pd-content"><p style="text-align:justify; margin-bottom:11px"><b>Asus TUF Gaming F15 FX506LHB-HN188W là chiếc <a href="https://fptshop.com.vn/may-tinh-xach-tay/gaming-do-hoa">laptop gaming giá rẻ</a> với thiết kế tuyệt đẹp, phong cách chuẩn game thủ và cấu hình mạnh mẽ cho cả học tập, công việc cũng như chơi game. Bên cạnh đó là độ bền chuẩn quân đội đã làm nên tên tuổi của dòng TUF.</b></p>

<p style="margin-bottom: 11px; text-align: center;"><b><img alt="Asus TUF Gaming F15 FX506LHB-HN188W (Ảnh 1)" class="" src="https://images.fpt.shop/unsafe/filters:quality(90)/fptshop.com.vn/Uploads/images/2015/0511/ASUS-TUF-Gaming-F15-2021-black-fpt-3.jpg"></b></p>

<h3 style="text-align: justify; margin-bottom: 11px;"><b>Chơi game mượt mà trên màn hình 144Hz</b></h3>

<p style="text-align:justify; margin-bottom:11px">Màn hình <a href="https://fptshop.com.vn/may-tinh-xach-tay/asus-tuf-gaming-fx506lhb-hn188w-i5-10300h">ASUS&nbsp;TUF F15</a> được chế tác viền mỏng tối đa, mang đến những hình ảnh tuyệt đẹp trên tấm nền 15,6 inch, độ phân giải Full HD. Đặc biệt, đây còn là màn hình có tốc độ khung hình vượt trội 144Hz. Các tựa game sẽ được tái hiện một cách mượt mà, tốc độ khung hình nhanh và giảm thiểu hiện tượng xé hình. Hơn thế nữa, bạn còn có thể kết nối với hai màn hình bên ngoài cùng lúc, bao gồm một màn hình để làm việc qua cổng USB 3.2 gen 2 Type-C hỗ trợ DisplayPort 1.4 và một màn hình lớn để chơi game, xem phim 4K qua cổng HDMI 2.0b.</p>

<p style="margin-bottom: 11px; text-align: center;"><img alt="Asus TUF Gaming F15 FX506LHB-HN188W (Ảnh 2)" class="" src="https://images.fpt.shop/unsafe/filters:quality(90)/fptshop.com.vn/Uploads/images/2015/0511/ASUS-TUF-Gaming-F15-2021-black-fpt-6.jpg"></p>
</div>`;
const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});
function ProductPage() {
    const [allTabsState, setAllTabsState] = useState([
        {
            id: 1,
            name: 'Đánh giá',
            type: 'review',
        },
        {
            id: 2,
            name: 'Bình luận',
            type: 'comment',
        },
    ]);
    const [value, setValue] = useState('review');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [commentListState, setCommentListState] = useState([1, 2, 3, 4, 5]);
    const [reviewListState, setReviewListState] = useState([]);

    const [commentDataState, setCommentDataState] = useState('');

    const commentOnInput = (e) => {
        setCommentDataState(e.target.value);
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-stretch">
                <div className="md:w-[50%] w-full ">
                    <SildeshowProduct />
                </div>
                <div className="md:w-[50%] w-full flex flex-col">
                    <div className="flex-1">
                        <ProductInfomation />
                        <div className="w-full p-4 flex flex-col md:flex-row">
                            <CustomizedSnackbars
                                openButton={
                                    <div className="flex flex-col justify-center items-center w-full mr-0 md:mr-2 p-4 bg-red-500 text-lg cursor-pointer hover:bg-red-600 hover:shadow-lg select-none rounded shadow-md active:bg-red-700 text-white font-semibold">
                                        THÊM VÀO GIỎ HÀNG
                                    </div>
                                }
                                message={'Đã thêm vào giỏ hàng'}
                                actionAfterClick={() => {}}
                            />
                            <OrderDialog
                                openButton={
                                    <div className="flex flex-col justify-center items-center w-full ml-0 mt-2 md:mt-0 md:ml-2 p-4 bg-blue-500 text-lg cursor-pointer hover:bg-blue-600 hover:shadow-lg select-none rounded shadow-md active:bg-blue-700 text-white font-semibold">
                                        ĐẶT HÀNG
                                    </div>
                                }
                            >
                                <ComplexAccordion
                                    main={true}
                                    introduction={
                                        <div className={`flex flex-col justify-center items-center`}>
                                            <div>
                                                <img
                                                    className="w-[200px]"
                                                    alt={'product'}
                                                    src="https://nguyencongpc.vn/photos/17/ASUS-TUF-Gaming-F15-FX506HC-HN002T-9.jpg"
                                                />
                                            </div>
                                            <div className="font-bold text-blue-500">
                                                Asus TUF Gaming F15 FX506LHB-HN188W
                                            </div>
                                        </div>
                                    }
                                >
                                    <div>
                                        <div>
                                            <p>
                                                <b>Giá:</b> {VND.format(20691000)}
                                            </p>
                                            <div className="flex flex-row ">
                                                <div className="w-[100px]">
                                                    <b>Số lượng:</b>
                                                </div>
                                                <div className="w-[100px]">
                                                    <input className="w-full" type="number" value={1} />
                                                </div>
                                            </div>
                                        </div>
                                        <ProductStatistics mt={0} />
                                    </div>
                                </ComplexAccordion>
                                <div className="flex my-2 flex-row md:p-4 md:flex-row items-center justify-between">
                                    <div>
                                        <div>
                                            <b>Phí vận chuyển:</b> 25,000đ
                                        </div>
                                        <b>Tổng tiền:</b>
                                        <p className="text-lg md:text-xl font-bold text-red-500">20,691,000₫</p>
                                    </div>
                                    <div>
                                        <strike>22,990,000₫</strike>
                                        <p className="text-blue-500">
                                            <p>
                                                Giảm <b>10%</b>
                                            </p>
                                        </p>
                                    </div>
                                </div>
                                <div className="w-full mt-2 p-2">
                                    <div className="flex flex-row justify-center items-center w-full p-4 bg-red-500 text-lg cursor-pointer hover:bg-red-600 hover:shadow-lg select-none rounded shadow-md active:bg-red-700 text-white font-semibold">
                                        Đặt hàng <FontAwesomeIcon className="ml-2" icon={faCartShopping} />
                                    </div>
                                </div>
                            </OrderDialog>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full my-4">
                <ManufacturerReviewCard
                    code="asus"
                    name="Asus"
                    image="https://thumbs.dreamstime.com/b/glowing-asus-rog-logo-gaming-laptop-miercurea-ciuc-romania-august-155994881.jpg"
                />
            </div>
            <div className="flex md:flex-row flex-col-reverse mt-8">
                <div className="w-full md:w-[70%]">
                    <h3 className="text-3xl font-bold mb-4">Thông tin sản phẩm</h3>
                    <div className="p-4 md:p-0">{parse(content)}</div>
                </div>
                <div className="w-full md:flex-1">
                    <div className="w-full p-4">
                        <ReviewTable>
                            <div className="w-full flex flex-col items-center">
                                <p className="mb-2 font-semibold text-lg">Viết đánh giá của bạn</p>
                                <div className="w-full">
                                    <TextField
                                        label="Đánh giá"
                                        className="w-full"
                                        rows={3}
                                        maxRows={4}
                                        multiline
                                        onInput={commentOnInput}
                                        value={commentDataState}
                                    />
                                </div>
                                <div className="w-full flex flex-row justify-end mt-2">
                                    <Button endIcon={<FontAwesomeIcon icon={faComment} />} variant="contained">
                                        Đánh giá
                                    </Button>
                                </div>
                            </div>
                        </ReviewTable>
                    </div>
                </div>
            </div>
            <div className="mt-10 w-full">
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                {allTabsState.map((tab) => {
                                    return <Tab label={tab.name} value={tab.type} key={tab.id} />;
                                })}
                            </TabList>
                        </Box>
                    </TabContext>
                </Box>
                {value === 'review' ? (
                    <ul className="border border-slate-200 rounded-lg shadow ease-in p-4 md:p-8">
                        {reviewListState === null ? (
                            <LoadingProcess />
                        ) : (
                            reviewListState.map((review, index) => {
                                return (
                                    <li key={index}>
                                        <ReviewCard
                                            avatar={review.userAvatar}
                                            comment={review.comment}
                                            stars={review.stars}
                                            username={review.userName}
                                        />
                                    </li>
                                );
                            })
                        )}
                    </ul>
                ) : (
                    <ul className="border border-slate-200 rounded-lg shadow ease-in p-4 md:p-8">
                        {commentListState === null ? (
                            <LoadingProcess />
                        ) : (
                            <>
                                <div className="w-full flex flex-col items-center mb-6">
                                    <div className="w-full">
                                        <TextField
                                            label="Bình luận"
                                            className="w-full"
                                            rows={3}
                                            maxRows={4}
                                            multiline
                                            onInput={commentOnInput}
                                            value={commentDataState}
                                        />
                                    </div>
                                    <div className="w-full flex flex-row justify-end mt-2">
                                        <Button endIcon={<FontAwesomeIcon icon={faComment} />} variant="contained">
                                            Bình luận
                                        </Button>
                                    </div>
                                </div>
                                {commentListState.map((review, index) => {
                                    return (
                                        <li key={index}>
                                            <CommentCard
                                                avatar={review.userAvatar}
                                                comment={review.comment}
                                                username={review.userName}
                                                fullname={review.fullname}
                                                date={review.createdDate}
                                            />
                                        </li>
                                    );
                                })}
                            </>
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default ProductPage;
