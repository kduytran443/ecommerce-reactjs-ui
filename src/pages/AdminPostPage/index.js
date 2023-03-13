import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import RecipeReviewCard from '~/components/RecipeReviewCard';

function AdminPostPage() {
    const [productListState, setProductListState] = useState(() => {
        return [1];
    });

    return (
        <div>
            <ul className="flex flex-row flex-wrap justify-center items-center">
                {productListState.map((product) => {
                    return (
                        <li className="py-2 px-[2px] sm:px-2 w-[50%] md:w-[33%] lg:w-[25%]">
                            <RecipeReviewCard
                                name="Laptop Asus Rog Strix G15 G513IE-HN246W"
                                price={26990000}
                                productCode={'laptop-asus-rog-strix-g15-g513ie-hn246w'}
                                discount={10}
                                image={
                                    'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/l/a/laptop-asus-rog-strix-g15-g513ie-hn246w-1.jpg'
                                }
                            />
                            <div className="w-full p-4 rounded-lg hover:bg-blue-600 active:bg-blue-700 text-center bg-blue-500 shadow-blue-300 shadow-lg cursor-pointer select-none text-white font-bold text-xl">
                                <FontAwesomeIcon icon={faCheck} className="mr-2" /> Duyệt bài đăng
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default AdminPostPage;
