import { deleteConfig, getConfig, postConfig, putConfig } from '~/services/config';
import { API_BASE_URL } from '~/constants';

export const orderDetailsService = {
    api: 'api/order-details',
    async getOrdersDetails() {
        //classLessonId
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
    async getOrderDetailsById(id) {
        //classLessonId
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/${id}`, config);
        return response.json();
    },
    async postOrderDetails(orderDetails) {
        const config = postConfig(orderDetails);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
    async putOrderDetails(orderDetails) {
        const config = putConfig(orderDetails);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
    async deleteOrderDetails(orderDetails) {
        const config = deleteConfig(orderDetails);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
};
