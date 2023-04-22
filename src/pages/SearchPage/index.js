import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CheckBox } from '@mui/icons-material';
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    InputAdornment,
    InputLabel,
    MenuItem,
    RadioGroup,
    Select,
    Slider,
    TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import RecipeReviewCard from '~/components/RecipeReviewCard';
import SimpleAccordion from '~/components/SimpleAccordion';
import { categoryService } from '~/services/categoryService';
import { manufacturerService } from '~/services/manufacturerService';
import { productService } from '~/services/productService';
import { validDiscount } from '~/utils';

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
    const [categoryListState, setCategoryListState] = useState([]);
    const [selectedCategoryCode, setSelectedCategoryCode] = useState();

    const [manufacturers, setManufacturers] = useState([]);
    const [selectedManufacturer, setSelectedManufacturer] = useState();

    const [checkDiscount, setCheckDiscount] = useState(false);

    useEffect(() => {
        categoryService.getCategories().then((data) => {
            if (data.length > 0) {
                setCategoryListState(data);
            }
        });
    }, [location]);
    useEffect(() => {
        manufacturerService.getManufacturers().then((data) => {
            if (data.length > 0) {
                setManufacturers(data);
            }
        });
    }, [location]);

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
            setProductListState(data);
        });
    }, [location]);
    const navigate = useNavigate();
    const search = () => {
        if (searchInputState.trim() || searchInputState === ' ') {
            navigate('/search/' + encodeURI(searchInputState));
        }
    };

    const [filteredProductList, setFilteredProductList] = useState([]);

    const filter = () => {
        const arr = [...productListState];

        const filteredArr = arr
            .filter((item) => {
                return item.name.toLowerCase().includes(searchInputState.toLowerCase());
            })
            .filter((item) => {
                return selectedCategoryCode
                    ? item?.categoryCode === selectedCategoryCode || selectedManufacturer === 'all'
                    : true;
            })
            .filter((item) => {
                return selectedManufacturer
                    ? item?.manufacturer.code === selectedManufacturer || selectedManufacturer === 'all'
                    : true;
            })
            .filter((item) => {
                const countDiscount = item?.discounts.reduce((pre, cur) => {
                    return validDiscount(cur) ? pre + 1 : pre;
                }, 0);

                return checkDiscount ? countDiscount > 0 : true;
            });

        setFilteredProductList(filteredArr);
    };

    useEffect(() => {
        filter();
    }, [productListState]);

    const submit = () => {
        filter();
    };

    return (
        <div className="select-none">
            <h1 className="font-bold text-3xl p-2">Tìm kiếm</h1>
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
            <div>
                <div>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Danh mục</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedCategoryCode}
                                defaultValue={selectedCategoryCode}
                                label="Danh mục"
                                onChange={(e) => {
                                    setSelectedCategoryCode(e.target.value);
                                }}
                            >
                                <MenuItem value={'all'}>Tất cả</MenuItem>
                                {categoryListState.map((item) => (
                                    <MenuItem key={item.code} value={item.code}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </div>
            </div>

            <div className="my-4">
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Nhà sản xuất</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedManufacturer}
                            defaultValue={selectedManufacturer}
                            label="Chủ đề"
                            onChange={(e) => {
                                setSelectedManufacturer(e.target.value);
                            }}
                        >
                            <MenuItem value={'all'}>Tất cả</MenuItem>
                            {manufacturers.map((item) => (
                                <MenuItem key={item.id} value={item.code}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </div>
            <div className="flex flex-row items-center">
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={(e) => {
                                    setCheckDiscount(e.target.checked);
                                }}
                                defaultChecked
                            />
                        }
                        label="Giảm giá"
                    />
                </FormGroup>
            </div>

            <div
                onClick={submit}
                className="w-full mt-8 p-4 rounded-lg hover:bg-blue-600 active:bg-blue-700 text-center bg-blue-500 shadow-blue-300 shadow-lg cursor-pointer select-none text-white font-bold text-xl"
            >
                <FontAwesomeIcon icon={faSearch} className="mr-2" /> Tìm kiếm
            </div>

            <ul className="flex flex-row flex-wrap justify-start items-center">
                {filteredProductList.map((product) => {
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
                {filteredProductList.length === 0 && <div className="mt-8">Không có sản phẩm nào phù hợp</div>}
            </ul>
        </div>
    );
}

export default SearchPage;

/*


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

*/
