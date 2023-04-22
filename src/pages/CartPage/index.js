import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Cart from '~/components/Cart';
import OrderDialog from '~/components/Dialog';
import { addressService } from '~/services/addressService';
import { orderDetailsService } from '~/services/orderDetailsService';
import { orderService } from '~/services/orderService';

function CartPage() {
    return (
        <div className="w-full">
            <Cart main={true} />
        </div>
    );
}

export default CartPage;
