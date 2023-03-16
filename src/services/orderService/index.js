import { deleteConfig, getConfig, postConfig, putConfig } from '~/services/config';
import { API_BASE_URL } from '~/constants';

export const orderService = {
    api: 'api/order',
    async getOrders() {
        //classLessonId
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
    async getOrdersByUserId() {
        //classLessonId
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/user`, config);
        return response.json();
    },
    async getOrderById(orderId) {
        //classLessonId
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/${orderId}`, config);
        return response.json();
    },
    async postOrder(order) {
        const config = postConfig(order);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
    async putOrder(order) {
        const config = putConfig(order);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
    async deleteOrder(order) {
        const config = deleteConfig(order);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
    async updateOrderStatus(orderId, status) {
        const config = putConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/${orderId}?status=${status}`, config);
        return response.json();
    },
};
