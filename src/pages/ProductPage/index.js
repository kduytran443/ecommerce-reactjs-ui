import { useEffect, useMemo, useState } from 'react';
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
import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Rating,
    Tab,
    TextField,
} from '@mui/material';
import ReviewCard from '~/components/ReviewCard';
import Line from '~/components/Line';
import { TabContext, TabList } from '@mui/lab';
import ManufacturerReviewCard from '~/components/ManufacturerReviewCard';
import ReviewTable from '~/components/ReviewTable';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { productService } from '~/services/productService';
import { productImageService } from '~/services/productImageService';
import { productInfoService } from '~/services/productInfoService';
import SpecificationList from '~/components/SpecificationList';
import { productSpecificationService } from '~/services/productSpecificationService';
import { deliveryFee } from '~/utils/deliveryFee';
import { addressService } from '~/services/addressService';
import { cartService } from '~/services/cartService';
import { manufacturerService } from '~/services/manufacturerService';
import { useUser } from '~/stores/UserStore';
import { orderService } from '~/services/orderService';
import { orderDetailsService } from '~/services/orderDetailsService';
import { reviewService } from '~/services/reviewService';
import AlertSuccessDialog from '~/components/AlertSuccessDialog';

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
    const { productCode } = useParams();
    const navigate = useNavigate();
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
    const location = useLocation();
    const [value, setValue] = useState('review');
    const [alertSuccess, setAlertSuccess] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [commentListState, setCommentListState] = useState([1, 2, 3, 4, 5]);
    const [reviewListState, setReviewListState] = useState([]);

    const [commentDataState, setCommentDataState] = useState('');

    const commentOnInput = (e) => {
        setCommentDataState(e.target.value);
    };

    const [productImageListState, setProductImageListState] = useState();

    const [productState, setProductState] = useState({});

    useEffect(() => {
        productService.getProductByCode(productCode).then((data) => {
            if (data.status !== 500) {
                setProductState(data);
                setTotalPrice(data.price);
            }
        });
    }, [location]);

    useEffect(() => {
        productImageService.getProductImagesByProductCode(productCode).then((data) => {
            if (data.status !== 500) {
                console.log(data);
                setProductImageListState(data);
            }
        });
    }, [location]);

    const [productSpecificationListState, setProductSpecificationListState] = useState([]);
    useEffect(() => {
        productSpecificationService.getProductSpecificationByProductCode(productCode).then((data) => {
            if (data.status !== 500) {
                console.log(data);
                setProductSpecificationListState(data);
            }
        });
    }, [location]);

    const [discountState, setDiscountState] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(() => {
        if (productState.discounts && productState.discounts.length > 0) {
            const max = productState.discounts.reduce((prev, current) => {
                return prev.discountPercent > current.discountPercent ? prev : current;
            });
            setDiscountState(max ? max : {});
            if (max) {
                setTotalPrice((pre) => pre - pre * (max.discountPercent / 100));
            }
        }
    }, [productState.discounts]);

    const [addressListState, setAddressListState] = useState([]);
    const loadAddress = () => {
        addressService.getAddress().then((data) => {
            if (data.length > 0 && data.status !== 500) {
                setAddressListState(data);
            }
        });
    };
    const [selectedAddressIdState, setSelectedAddressIdState] = useState();
    const checkAddress = (e) => {
        setSelectedAddressIdState(e.target.value);
    };
    useEffect(() => {
        loadAddress();
    }, [location]);

    const postCart = () => {
        cartService.postCart({ productId: productState.id, quantity: 1 }).then((data) => {});
    };

    const [manufacturerState, setManufacturerState] = useState({});
    useEffect(() => {
        manufacturerService.getManufacturerByProductCode(productCode).then((data) => {
            if (data.status !== 500) {
                console.log(data);
                setManufacturerState(data);
            }
        });
    }, [location]);

    const [totalDiscountPercent, setTotalDiscountPercent] = useState(0);

    useEffect(() => {
        if (productState.discounts && productState.discounts.length > 0) {
            let total = 0;
            console.log(productState.discounts);

            productState.discounts.forEach((discount) => {
                total += discount.discountPercent;
            });
            setTotalDiscountPercent(total);
        }
    }, [productState]);

    //address, deliveryFee, note,
    const order = () => {
        if (selectedAddressIdState) {
            const orderObj = {
                address: { id: selectedAddressIdState },
                note: 'Ghi chú',
            };
            orderService.postOrder(orderObj).then((orderData) => {
                console.log('orderDetails orderDetails orderDetails', orderData);
                if (orderData.status) {
                    const orderDetails = {
                        quantity: 1,
                        discountPercent: totalDiscountPercent,
                        orderId: orderData.id,
                        productId: productState.id,
                        price: productState.price,
                    };
                    console.log('orderDetails', orderDetails);
                    orderDetailsService.postOrderDetails(orderDetails).then((orderDetailsData) => {
                        navigate('/order-details/' + orderData.id);
                    });
                }
            });
        }
    };
    const navigateToLogin = () => {
        navigate('/login');
    };

    const [userState, dispatchUserState] = useUser();

    const loadReviews = () => {
        reviewService.getReviews(productCode).then((data) => {
            if (data.length > 0) {
                setReviewListState(data);
            }
        });
    };
    const loadReviewByUser = () => {
        reviewService.getReviewByUser(productCode).then((data) => {
            console.log('datadatadatadatadatadata', data);
            setReviewRatingState(data);
        });
    };
    useEffect(() => {
        loadReviews();
        loadReviewByUser();
    }, [location]);
    const [reviewRatingState, setReviewRatingState] = useState({ rating: 0 });
    const changeReviewRating = (e) => {
        const obj = { ...reviewRatingState };
        obj.rating = e.target.value;
        setReviewRatingState(obj);
    };
    const changeReviewComment = (e) => {
        const obj = { ...reviewRatingState };
        obj.content = e.target.value;
        setReviewRatingState(obj);
    };
    const postReview = () => {
        const review = {
            rating: reviewRatingState.rating,
            productCode: productCode,
            content: reviewRatingState.content,
        };

        reviewService.postReview(review).then((data) => {
            if (data) {
                setAlertSuccess(1);
                setTimeout(() => {
                    loadReviews();
                    setAlertSuccess(0);
                }, 1000);
            } else {
                setAlertSuccess(-1);
                setTimeout(() => {
                    setAlertSuccess(0);
                }, 1000);
            }
        });
    };
    const [commentPagination, setCommentPagination] = useState(1);

    const rating = useMemo(() => {
        if (reviewListState.length === 0) return 0;

        return (
            reviewListState.reduce((pre, cur) => {
                return pre + cur.rating;
            }, 0) / reviewListState.length
        );
    }, [reviewListState]);

    return (
        <div className="bg-white">
            <AlertSuccessDialog open={alertSuccess === 1} />
            <div className="flex flex-col md:flex-row md:items-stretch">
                <div className="md:w-[50%] w-full ">
                    <SildeshowProduct dataList={productImageListState} />
                </div>
                <div className="md:w-[50%] w-full flex flex-col">
                    <div className="flex-1">
                        {productState.code && (
                            <ProductInfomation
                                warrantyMonth={productState.warrantyMonth}
                                price={productState.price}
                                productCode={productState.code}
                                discounts={productState.discounts}
                            />
                        )}
                        <div className="w-full p-4 flex flex-col">
                            <CustomizedSnackbars
                                openButton={
                                    <div
                                        onClick={!userState.username && navigateToLogin}
                                        className="flex flex-col justify-center items-center w-full mr-0 lg:mr-2 p-4 bg-red-500 text-lg cursor-pointer hover:bg-red-600 hover:shadow-lg select-none rounded shadow-md active:bg-red-700 shadow-red-400 text-white font-semibold"
                                    >
                                        THÊM VÀO GIỎ HÀNG
                                    </div>
                                }
                                message={'Đã thêm vào giỏ hàng'}
                                actionAfterClick={
                                    productState.id
                                        ? () => {
                                              postCart();
                                          }
                                        : () => {}
                                }
                            />
                            <OrderDialog
                                agreeAction={order}
                                agree="Đặt hàng"
                                selectedAddress={selectedAddressIdState}
                                openButton={
                                    <div
                                        onClick={!userState.username && navigateToLogin}
                                        className="flex flex-col justify-center] items-center w-full mt-4 p-4 bg-blue-500 text-lg cursor-pointer hover:bg-blue-600 hover:shadow-lg select-none rounded shadow-md active:bg-blue-700 shadow-blue-400 text-white font-semibold"
                                    >
                                        ĐẶT HÀNG
                                    </div>
                                }
                            >
                                <div className="p-4">
                                    <div>
                                        <div className="w-full max-w-[400px] max-h-[300px] overflow-hidden">
                                            <img className="w-full" alt="" src={productState.avatar} />
                                        </div>
                                        <div className="font-bold mt-4">{productState.name}</div>
                                    </div>
                                    <div>
                                        <FormControl>
                                            <FormLabel
                                                className="mt-4"
                                                id="address-product-order-radio-buttons-group-label"
                                            >
                                                Địa chỉ
                                            </FormLabel>
                                            <RadioGroup
                                                value={selectedAddressIdState}
                                                aria-labelledby="address-product-order-radio-buttons-group-label"
                                                defaultValue="female"
                                                name="radio-buttons-group"
                                                onChange={checkAddress}
                                            >
                                                {addressListState &&
                                                    addressListState.map((address, index) => {
                                                        return (
                                                            <FormControlLabel
                                                                key={index}
                                                                value={address.id}
                                                                control={<Radio />}
                                                                label={address.details}
                                                            />
                                                        );
                                                    })}
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                    <div className="flex my-2 flex-row md:p-4 md:flex-row items-center justify-between">
                                        <div>
                                            <div>
                                                <b>Phí vận chuyển:</b> {deliveryFee} VNĐ
                                            </div>
                                            <b>Tổng tiền:</b>
                                            <p className="text-lg md:text-xl font-bold text-red-500">
                                                {totalPrice + deliveryFee} VNĐ
                                            </p>
                                        </div>
                                        <div>
                                            <strike>{productState.price} VNĐ</strike>
                                            <p className="text-blue-500">
                                                <p>
                                                    Giảm <b>{discountState.discountPercent}%</b>
                                                </p>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </OrderDialog>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full p-4 my-4">
                {manufacturerState && (
                    <ManufacturerReviewCard
                        code={manufacturerState.code}
                        name={manufacturerState.name}
                        image={manufacturerState.logo}
                    />
                )}
            </div>
            <div className="w-full p-4 rounded border">
                <h3 className="text-lg">Đánh giá: ({reviewListState.length})</h3>
                {rating >= 0 && (
                    <Rating
                        readOnly={true}
                        defaultValue={rating}
                        value={rating}
                        precision={1}
                        onChange={changeReviewRating}
                    />
                )}
            </div>
            <div className="flex md:flex-row flex-col-reverse">
                {productState && (
                    <div className="w-full md:w-[100%]">
                        <div className="w-full p-4">
                            <h3 className="text-2xl font-bold mb-4">Thông số kỹ thuật</h3>
                            <SpecificationList list={productSpecificationListState} />
                        </div>
                    </div>
                )}
            </div>
            <div className="mt-12 p-4">
                {reviewRatingState && reviewRatingState.rating > 0 ? (
                    <>
                        <p className="font-bold">Review của bạn về sản phẩm này:</p>
                        <Rating
                            readOnly={false}
                            defaultValue={reviewRatingState.rating}
                            value={reviewRatingState.rating}
                            precision={1}
                            onChange={changeReviewRating}
                        />
                    </>
                ) : (
                    <>
                        <p className="font-bold">Review của bạn về sản phẩm này:</p>
                        <Rating
                            readOnly={false}
                            value={reviewRatingState.rating}
                            precision={1}
                            onChange={changeReviewRating}
                        />
                    </>
                )}
                <>
                    <div className="w-full">
                        <TextField
                            label="Đánh giá"
                            className="w-full"
                            multiline
                            rows={2}
                            onInput={changeReviewComment}
                            value={reviewRatingState.content || ''}
                        />
                    </div>
                    <Button onClick={postReview}>Đánh giá</Button>
                </>
            </div>
            <div className="mt-2 w-full">
                <ul className="border border-slate-200 rounded-lg shadow ease-in">
                    {reviewListState === null ? (
                        <LoadingProcess />
                    ) : (
                        <>
                            {reviewListState.length > 0 ? (
                                <>
                                    {reviewListState
                                        .filter((review, index) => {
                                            return index + 1 <= commentPagination * 5;
                                        })
                                        .map((review, index) => {
                                            return (
                                                <li key={index}>
                                                    <ReviewCard
                                                        avatar={review.avatar}
                                                        comment={review.content}
                                                        rating={review.rating}
                                                        username={review.username}
                                                    />
                                                    {index < reviewListState.length - 1 && (
                                                        <div className="w-full h-[1px] bg-slate-300"></div>
                                                    )}
                                                </li>
                                            );
                                        })}
                                    {reviewListState.length > commentPagination * 5 && (
                                        <Button
                                            onClick={(e) => {
                                                setCommentPagination((pre) => pre + 1);
                                            }}
                                        >
                                            Xem thêm
                                        </Button>
                                    )}
                                </>
                            ) : (
                                <div className="p-6">Chưa có đánh giá nào</div>
                            )}
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default ProductPage;

/*
                <div className="w-full md:flex-1">
                    <div className="w-full p-4">
                        <ReviewTable>
                            <div className="w-full flex flex-col items-center"></div>
                        </ReviewTable>
                    </div>
                </div>

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
*/
