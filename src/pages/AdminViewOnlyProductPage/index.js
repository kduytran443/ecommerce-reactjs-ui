import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductTable from '~/components/ProductTable';
import ProductViewOnlyTable from '~/components/ProductViewOnlyTable';
import { productService } from '~/services/productService';

function AdminViewOnlyProductPage() {
    const [productListState, setProductListState] = useState([]);

    const navigate = useNavigate();

    const [searchValue, setSearchValue] = useState('');
    const [typeSearch, setTypeSearch] = useState('Name');

    const handleChange = (event) => {
        setTypeSearch(event.target.value);
    };

    const location = useLocation();
    useEffect(() => {
        productService.getAllProductDetails().then((data) => {
            console.log('data', data);
            setProductListState(data);
        });
    }, [location]);

    const submitSearch = () => {
        if (searchValue.trim()) {
            const value = encodeURI(searchValue.trim());
            productService.getAllProductDetailsByName(value).then((data) => {
                setProductListState(data);
            });
        } else {
            productService.getAllProductDetails().then((data) => {
                setProductListState(data);
            });
        }
    };

    return (
        <div>
            <div className="mb-6">
                <Button
                    onClick={(e) => {
                        navigate('/admin/');
                    }}
                    startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
                >
                    Quay lại
                </Button>
            </div>
            <h2 className="font-bold text-xl mt-8 mb-2">Thông tin sản phẩm</h2>
            <div className="flex flex-row items-center justify-start rounded shadow w-full bg-white p-4">
                <TextField
                    value={searchValue}
                    size="small"
                    onInput={(e) => {
                        setSearchValue(e.target.value);
                    }}
                    label="Tên sản phẩm"
                />
                <div className="ml-4">
                    <Button onClick={submitSearch} variant="contained">
                        Tìm
                    </Button>
                </div>
            </div>
            {productListState.length > 0 && <ProductViewOnlyTable rows={productListState} />}
        </div>
    );
}

export default AdminViewOnlyProductPage;

/*


            <div className="flex flex-row items-center justify-start rounded shadow w-full bg-white p-4">
                <div>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-select-small">Tìm kiếm theo</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={typeSearch}
                            label="Tìm kiếm theo"
                            onChange={handleChange}
                            defaultValue="name"
                        >
                            <MenuItem value={'name'}>Name</MenuItem>
                            <MenuItem value={'stock >='}>Hàng tồn {'>='}</MenuItem>
                            <MenuItem value={'stock <='}>Hàng tồn {'<='}</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <TextField
                    value={searchValue}
                    size="small"
                    onInput={(e) => {
                        setSearchValue(e.target.value);
                    }}
                    label={typeSearch}
                />
                <div className="ml-4">
                    <Button variant="contained">Tìm</Button>
                </div>
            </div>

*/
