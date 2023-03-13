import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductTable from '~/components/ProductTable';
import ProductViewOnlyTable from '~/components/ProductViewOnlyTable';

function AdminViewOnlyProductPage() {
    const [productListState, setProductListState] = useState([
        {
            id: 1,
            image: 'https://laptopaz.vn/media/product/2324_laptopaz_asus_tuf_f15_fx506lh_hn188w_1.jpg',
            name: 'Laptop Asus TUF Gaming F15 FX506LHB',
            stock: '6',
            price: '20.990.000đ',
            code: 'laptop-asus-tuf-gaming-f15-fx506lhb',
            manufacturer: 'Asus',
            discount: '10%',
            favorite: 5,
        },
    ]);

    const navigate = useNavigate();

    const [searchValue, setSearchValue] = useState('');
    const [typeSearch, setTypeSearch] = useState('Name');

    const handleChange = (event) => {
        setTypeSearch(event.target.value);
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
            <ProductViewOnlyTable rows={productListState} />
        </div>
    );
}

export default AdminViewOnlyProductPage;
