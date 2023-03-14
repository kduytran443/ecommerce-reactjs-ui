import { deleteConfig, getConfig, postConfig, putConfig } from '~/services/config';
import { API_BASE_URL } from '~/constants';

export const paymentService = {
    api: 'api/payment',
    async getPaymentByOrderId(orderId) {
        //classLessonId
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/${orderId}`, config);
        return response.json();
    },
    async postPayment(payment) {
        //classLessonId
        const config = postConfig(payment);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
};
