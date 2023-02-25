import { Button, Pagination, Slider } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Line from '~/components/Line';
import RecipeReviewCard from '~/components/RecipeReviewCard';
import SimpleAccordion from '~/components/SimpleAccordion';

function CategoryPage() {
    const [productListState, setProductListState] = useState(() => {
        return [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];
    });
    const [categoryState, setCategoryState] = useState(null);
    const navigate = useNavigate();
    const { code } = useParams();

    useEffect(() => {
        async function getData() {
            const data = {
                id: 1,
                code: code,
                name: 'PC Gaming',
            };
            setCategoryState(data);
        }
        getData();
    }, []);

    return (
        <>
            <div>
                <Line title={categoryState?.name} />
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
                <div></div>
                <ul className="flex flex-row flex-wrap justify-center items-center">
                    {productListState.map((product) => {
                        return (
                            <li key={product.id} className="py-2 px-0 sm:px-2 w-[50%] sm:w-[46%] md:w-[32%] lg:w-[20%]">
                                <RecipeReviewCard />
                            </li>
                        );
                    })}
                </ul>
            </div>
            <Pagination count={10} color="primary" />
        </>
    );
}

export default CategoryPage;
