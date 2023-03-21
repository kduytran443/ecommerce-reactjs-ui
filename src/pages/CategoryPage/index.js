import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Pagination, Slider } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Line from '~/components/Line';
import RecipeReviewCard from '~/components/RecipeReviewCard';
import SimpleAccordion from '~/components/SimpleAccordion';
import { categoryService } from '~/services/categoryService';
import { productService } from '~/services/productService';

function CategoryPage() {
    const [productListState, setProductListState] = useState([]);
    const navigate = useNavigate();
    const { categoryCode } = useParams();
    const location = useLocation();
    const [categoryState, setCategoryState] = useState({});
    const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get('page');

    useEffect(() => {
        getData();
        loadProducts();
    }, [location]);

    const getData = () => {
        categoryService.getCategoryByCode(categoryCode).then((data) => {
            if (data.id) {
                console.log('category', data);
                setCategoryState(data);
            }
        });
    };

    const [countAll, setCountAll] = useState();
    const loadProducts = () => {
        productService.getProducts(page, categoryCode).then((data) => {
            if (data.data.length > 0) {
                setProductListState(data.data);
                setCountAll(Number(data.countAll));
            }
        });
    };

    console.log('productListState', countAll / 8);

    return (
        <>
            <div>
                <Button
                    onClick={(e) => {
                        navigate('/home');
                    }}
                    startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
                >
                    Quay lại
                </Button>
                <Line code={categoryState.code} title={categoryState?.name} />
                <div
                    className="w-full py-20 rounded"
                    style={{
                        backgroundImage: `url(${categoryState.image})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                    }}
                ></div>
                <div></div>
                <ul className="flex mt-8 flex-row flex-wrap justify-start items-center">
                    {productListState.map((product) => {
                        return (
                            <li className="py-2 px-[2px] sm:px-2 w-full md:w-[33%] lg:w-[25%]">
                                <RecipeReviewCard
                                    price={product.price}
                                    image={product.avatar}
                                    productCode={product.code}
                                    name={product.name}
                                    discounts={product.discounts}
                                />
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="mt-12 mb-4">
                {countAll > 0 && (
                    <Pagination
                        onChange={(event, value) => {
                            navigate('/category/' + categoryCode + '?page=' + value);
                        }}
                        count={Math.ceil(countAll / 8)}
                        defaultValue
                        color="primary"
                    />
                )}
            </div>
        </>
    );
}

export default CategoryPage;

/*


                <div className="max-w-full w-full overflow-x-auto overflow-hidden my-4">
                    <div className="w-[620px] py-2 md:py-0 md:w-full">
                        <div className="flex flex-row items-center justify-start">
                            <h3 className="ml-4">Sắp xếp theo:</h3>
                            <div className="mx-2">
                                <Button variant="contained">Mới nhất</Button>
                            </div>
                            <div className="mx-2">
                                <Button variant="outlined">Cũ nhất</Button>
                            </div>
                            <div className="mx-2">
                                <Button variant="outlined">Bán chạy nhất</Button>
                            </div>
                            <div className="mx-2">
                                <Button variant="outlined">Giá thấp</Button>
                            </div>
                            <div className="mx-2">
                                <Button variant="outlined">Giá cao</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <SimpleAccordion title="Bộ lọc">
                    <div className="flex flex-col">
                        <div className="p-2">
                            <span>Giá (Triệu đồng)</span>
                            <Slider
                                aria-label="Price"
                                defaultValue={1}
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={1}
                                max={50}
                            />
                        </div>
                    </div>
                </SimpleAccordion>

                <Pagination count={10} color="primary" />
*/
