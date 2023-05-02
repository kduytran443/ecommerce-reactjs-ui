import { faGroupArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Category from '~/components/Category';
import CustomizedSnackbars from '~/components/CustomizedSnackbars';
import Line from '~/components/Line';
import RecipeReviewCard from '~/components/RecipeReviewCard';
import SildeshowIntroduction from '~/components/SildeshowIntroduction';
import { categoryService } from '~/services/categoryService';
import { productService } from '~/services/productService';

function HomePage() {
    const [categoryListState, setCategoryListState] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        categoryService.getCategories().then((data) => {
            console.log('data', data);
            if (data.status !== 500) {
                setCategoryListState(data);
            }
        });
    }, [location]);

    const [laptopListState, setLaptopListState] = useState([]);

    const [laptopNumberState, setLaptopNumberState] = useState(0);

    useEffect(() => {
        productService.getProducts(0, 'laptop').then((data) => {
            if (data.status !== 500) {
                setLaptopListState(data.data);
                setLaptopNumberState(data.countAll);
            }
        });
    }, [location]);

    return (
        <>
            <div className="mb-6">
                <SildeshowIntroduction />
            </div>
            <ul className="flex flex-row flex-wrap mb-6">
                {categoryListState.map((item, index) => {
                    return (
                        <div className="w-full md:w-[50%] lg:w-[33%] p-4">
                            <Category
                                color="bg-gray-200 shadow-gray-100"
                                data={item.name}
                                name={'Danh mục'}
                                code={item.code}
                                image={item.icon}
                                link={'/category/' + item.code}
                                description={item.description}
                            />
                        </div>
                    );
                })}
            </ul>
            <div>
                <Line title={`Laptop gaming ${laptopNumberState}`} code="laptop" />
                <ul className="flex flex-row flex-wrap items-stretch ">
                    {laptopListState.map((product, index) => {
                        return index < 8 ? (
                            <li className="py-2 px-[2px] sm:px-2 w-full md:w-[50%] lg:w-[33%] xl:w-[25%]">
                                <RecipeReviewCard
                                    price={product.price}
                                    image={product.avatar}
                                    productCode={product.code}
                                    name={product.name}
                                    discounts={product.discounts}
                                />
                            </li>
                        ) : (
                            <></>
                        );
                    })}
                </ul>
            </div>
        </>
    );
}

export default HomePage;
