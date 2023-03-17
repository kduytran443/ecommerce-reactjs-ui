import { Button } from '@mui/material';
import { useState } from 'react';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import { API_BASE_URL } from '~/constants';
import { getUserJWT } from '~/services/config';

let stompClient = null;
function OrderSocket({ orderId, children, loadOrder = () => {} }) {
    const [connectedState, setConnectedState] = useState(false);

    const onConnected = () => {
        console.log('SOCKET CONNECTED!!!');
        stompClient.subscribe(`/order/orderId/${orderId}`, onMessageReceived);
    };

    function onMessageReceived(messagePayload) {
        const message = JSON.parse(messagePayload.body);
        console.log('Nhận dc');
        switch (message.type) {
            case 'PROCESS_ORDER': {
                setTimeout(() => {
                    loadOrder();
                }, 1000);
                break;
            }
            default: {
            }
        }
    }

    const onError = () => {};

    function register() {
        let socket = new SockJS(`${API_BASE_URL}/ws`);
        stompClient = over(socket);
        var headers = {
            Authorization: 'Bearer ' + getUserJWT(),
        };
        stompClient.debug = null;
        stompClient.connect(headers, onConnected, onError);
        setConnectedState(true);
    }

    if (orderId && !connectedState) {
        register();
    }

    const send = () => {
        console.log('ORDER NÈEEEE');
        const chatMessage = {
            type: 'PROCESS_ORDER',
        };
        stompClient.send(`/app/order.send/${orderId}`, {}, JSON.stringify(chatMessage));
    };

    return (
        <div className="w-full" onClick={send}>
            {children}
        </div>
    );
}

export default OrderSocket;
