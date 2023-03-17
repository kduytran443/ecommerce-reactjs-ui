import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductTable from '~/components/ProductTable';
import { productService } from '~/services/productService';

function AdminProductPage() {
    const [productListState, setProductListState] = useState([]);
    const navigate = useNavigate();

    const loadData = () => {
        productService.getAllProducts().then((data) => {
            if (data.length > 0) {
                const arr = data.map((data) => {
                    let discount = 0;
                    let date = new Date();
                    data.discounts.forEach((item) => {
                        if (item.endTime < date.getTime()) {
                            discount += item.discountPercent;
                        }
                    });
                    return {
                        id: data.id,
                        name: data.name,
                        image: data.avatar,
                        stock: 0,
                        price: data.price,
                        code: data.code,
                        manufacturer: data.manufacturer.name,
                        discount: discount,
                    };
                });
                console.log(arr);
                setProductListState(arr);
            }
        });
    };
    const location = useLocation();
    useEffect(() => {
        loadData();
    }, [location]);

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
            <Button
                onClick={(e) => {
                    navigate('create');
                }}
            >
                Thêm sản phẩm
            </Button>
            {productListState.length > 0 && <ProductTable reload={loadData} rows={productListState} />}
        </div>
    );
}

export default AdminProductPage;
