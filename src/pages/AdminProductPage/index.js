import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductTable from '~/components/ProductTable';

function AdminProductPage() {
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
        },
    ]);
    const navigate = useNavigate();

    return (
        <div className="p-6 bg-white rounded">
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
            <h1 className="text-3xl font-black mb-6">Sản phẩm</h1>
            <ProductTable rows={productListState} />
        </div>
    );
}

export default AdminProductPage;
