import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CheckBox } from '@mui/icons-material';
import { Checkbox, FormControlLabel, FormGroup, InputAdornment, Slider, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import RecipeReviewCard from '~/components/RecipeReviewCard';
import SimpleAccordion from '~/components/SimpleAccordion';
import { productService } from '~/services/productService';

function SearchPage() {
    const [searchInputState, setSearchInputState] = useState('');
    const { searchValue } = useParams();
    const [searchOptionsState, setSearchOptionsState] = useState({
        categoryList: [],
        minPrice: 0,
        maxPrice: 0,
        status: 1,
    });
    const [productListState, setProductListState] = useState(() => {
        return [];
    });
    const location = useLocation();
    const [categoryListState, setCategoryListState] = useState([
        {
            id: 1,
            name: 'Laptop',
            code: 'laptop',
        },
        {
            id: 2,
            name: 'Máy tính',
            code: 'may-tinh',
        },
        {
            id: 3,
            name: 'Linh kiện',
            code: 'linh-kien',
        },
    ]);

    const handleChangeMinPrice = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === '' || regex.test(e.target.value)) {
            setSearchOptionsState((pre) => {
                return { ...searchOptionsState, minPrice: e.target.value };
            });
        }
    };

    const handleChangeMaxPrice = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === '' || regex.test(e.target.value)) {
            setSearchOptionsState((pre) => {
                return { ...searchOptionsState, maxPrice: e.target.value };
            });
        }
    };

    useEffect(() => {
        productService.searchByName(searchValue).then((data) => {
            console.log('data', data);
            setProductListState(data);
        });
    }, [location]);
    const navigate = useNavigate();
    const search = () => {
        if (searchInputState.trim()) {
            navigate('/search/' + encodeURI(searchInputState));
        }
    };

    return (
        <div className="select-none">
            <h1 className="font-bold text-3xl p-2">Tìm kiếm</h1>
            <SimpleAccordion title="Bộ lọc">
                <div className="flex flex-col">
                    <div className="bg-slate-100 p-4 rounded-lg">
                        <h3 className="font-bold text-lg">Thể loại</h3>
                        <div className="flex flex-row flex-wrap">
                            {categoryListState.map((category) => {
                                return (
                                    <div className="mx-0 md:mx-2">
                                        <FormControlLabel control={<Checkbox defaultChecked />} label={category.name} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="bg-slate-100 p-4 rounded-lg w-full mt-6">
                        <h3 className="font-bold text-lg">Giá</h3>
                        <div className="flex flex-row items-center mt-4 flex-wrap w-full">
                            <div className="w-[50%]">
                                <TextField
                                    className="w-full"
                                    type="text"
                                    id="outlined-basic"
                                    label="Giá ít nhất"
                                    variant="outlined"
                                    onChange={(e) => handleChangeMinPrice(e)}
                                    value={searchOptionsState.minPrice}
                                />
                            </div>
                            <div className="w-[50%]">
                                <TextField
                                    className="w-full"
                                    type="text"
                                    id="outlined-basic"
                                    label="Giá cao nhất"
                                    variant="outlined"
                                    onChange={(e) => handleChangeMaxPrice(e)}
                                    value={searchOptionsState.maxPrice}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-100 p-4 rounded-lg w-full mt-6">
                        <h3 className="font-bold text-lg">Tình trạng</h3>
                        <div className="flex flex-row items-center mt-4 flex-wrap w-full">
                            <div className="mx-0 md:mx-2">
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Còn hàng" />
                            </div>
                            <div className="mx-0 md:mx-2">
                                <FormControlLabel control={<Checkbox defaultChecked />} label="hết hàng" />
                            </div>
                        </div>
                    </div>
                </div>
            </SimpleAccordion>
            <div className="my-6">
                <TextField
                    onChange={(e) => setSearchInputState(e.target.value)}
                    className="w-full"
                    value={searchInputState}
                    label="Tìm kiếm"
                    placeholder="Tìm kiếm"
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <FontAwesomeIcon icon={faSearch} />
                            </InputAdornment>
                        ),
                        autoCapitalize: 'off',
                        autoCorrect: 'off',
                    }}
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            search();
                        }
                    }}
                />
            </div>
            <ul className="flex flex-row flex-wrap justify-center items-center">
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
                {productListState.length === 0 && <div className="mt-8">Không có sản phẩm nào phù hợp</div>}
            </ul>
        </div>
    );
}

export default SearchPage;
