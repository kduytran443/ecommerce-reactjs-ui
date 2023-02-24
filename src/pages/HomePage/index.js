import { useState } from 'react';
import Line from '~/components/Line';
import RecipeReviewCard from '~/components/RecipeReviewCard';

function HomePage() {
    const [productListState, setProductListState] = useState(() => {
        return [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];
    });

    return (
        <>
            <Line title="Laptop gaming" />
            <ul className="flex flex-row flex-wrap justify-center items-center">
                {productListState.map((product) => {
                    return (
                        <li className="p-2 w-[100%] sm:w-[46%] md:w-[32%] lg:w-[20%]">
                            <RecipeReviewCard />
                        </li>
                    );
                })}
            </ul>
        </>
    );
}

export default HomePage;
