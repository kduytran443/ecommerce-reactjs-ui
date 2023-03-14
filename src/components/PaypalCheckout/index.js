import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useState } from 'react';

function PaypalCheckout({ orderDataId, username, email, phoneNumber, totalPrice, successAction = () => {} }) {
    const description = `${username} (${email}) sent ${totalPrice} to pay for order: ${orderDataId}.`;

    const [paidFor, setPaidFor] = useState(false);

    const handleApprove = (orderId) => {
        //orderId ở phương thức này là orderId của paypal (transaction) chứ không phải là orderId mua bán
        setPaidFor(true);
        successAction(orderId);
    };
    const [error, setError] = useState(null);
    if (error) {
        // Display error message, modal or redirect user to error page
        alert(error);
    }
    if (paidFor) {
        // Display success message, modal or redirect user to success page
    }
    return (
        <div className="w-full z-0" style={{ zIndex: '0' }}>
            {totalPrice > 0 && (
                <PayPalScriptProvider
                    options={{
                        'client-id': 'AYbtSZleOEbSvNPbuvZG_9VqtK_Y6ipvVGCkgq923t7GFqXTZzIwd-KdaUbGhyXOrBlPpAZHxJILb_sN',
                    }}
                >
                    <PayPalButtons
                        style={{
                            color: 'silver',
                            layout: 'horizontal',
                            height: 48,
                            tagline: false,
                            shape: 'pill',
                        }}
                        onClick={(data, actions) => {
                            return actions.resolve();
                        }}
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        description: description,
                                        amount: {
                                            value: totalPrice,
                                        },
                                    },
                                ],
                            });
                        }}
                        onApprove={async (data, actions) => {
                            const order = await actions.order.capture();
                            console.log('order', order);

                            handleApprove(data.orderID);
                        }}
                        onError={(err) => {
                            setError(err);
                            console.error('PayPal Checkout onError', err);
                        }}
                    />
                </PayPalScriptProvider>
            )}
        </div>
    );
}

export default PaypalCheckout;
