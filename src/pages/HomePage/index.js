import { Button, Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CustomizedSnackbars from '~/components/CustomizedSnackbars';
import Line from '~/components/Line';
import RecipeReviewCard from '~/components/RecipeReviewCard';
import SildeshowIntroduction from '~/components/SildeshowIntroduction';

function HomePage() {
    const [productListState, setProductListState] = useState(() => {
        return [1, 2, 3, 4, 5, 1, 2, 3];
    });
    const [categoryListState, setCategoryListState] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function getData() {
            const data = [
                {
                    id: 1,
                    name: 'Laptop',
                    code: 'laptop',
                    img: 'https://images.fpt.shop/unsafe/fit-in/60x60/filters:quality(90):fill(transparent)/fptshop.com.vn/Uploads/images/2022/iconcate/icon-laptop.png',
                },
                {
                    id: 2,
                    name: 'PC - Lắp ráp',
                    code: 'pc-lap-rap',
                    img: 'https://images.fpt.shop/unsafe/fit-in/60x60/filters:quality(90):fill(transparent)/fptshop.com.vn/Uploads/images/2022/iconcate/icon-pc.png',
                },
                {
                    id: 3,
                    name: 'Phụ kiện',
                    code: 'phu-kien',
                    img: 'https://images.fpt.shop/unsafe/fit-in/60x60/filters:quality(90):fill(transparent)/fptshop.com.vn/Uploads/images/2022/iconcate/icon-accessories.png',
                },
            ];
            setCategoryListState(data);
        }
        getData();
    }, []);

    return (
        <>
            <div className="mb-6">
                <SildeshowIntroduction />
            </div>
            <ul className="flex flex-row flex-wrap mb-6">
                {categoryListState.map((category) => {
                    return (
                        <li
                            className="group select-none h-[150px] md:w-[200px] w-[50%] hover:shadow-lg duration-100 hover:cursor-pointer flex flex-col justify-center items-center"
                            key={category.id}
                        >
                            <div
                                onClick={(e) => {
                                    navigate(`/category/${category.code}`);
                                }}
                                className="w-full h-full duration-100 flex flex-col justify-center items-center rounded border border-slate-200 hover:bg-blue-400 bg-slate-100"
                            >
                                <div className="bg-slate-200 p-4 duration-300 rounded-full hover:bg-white">
                                    <img src={category.img} alt={category.name} />
                                </div>
                                <h3 className="font-semibold text-lg group-hover:text-white mt-2">{category.name}</h3>
                            </div>
                        </li>
                    );
                })}
            </ul>
            <div>
                <Line title="Laptop gaming" />
                <ul className="flex flex-row flex-wrap justify-center items-center">
                    {productListState.map((product) => {
                        return (
                            <li className="py-2 px-[2px] sm:px-2 w-[50%] md:w-[33%] lg:w-[25%]">
                                <RecipeReviewCard productCode={'/product/laptop-gaming-asus'} />
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="mt-10">
                <Line title="Phụ kiện" />
                <ul className="flex flex-row flex-wrap justify-center items-center">
                    {productListState.map((product) => {
                        return (
                            <li className="py-2 px-[2px] sm:px-2 w-[50%] md:w-[33%] lg:w-[25%]">
                                <RecipeReviewCard productCode={'/product/laptop-gaming-asus'} />
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
}

export default HomePage;
