import { deleteConfig, getConfig, postConfig, putConfig } from '~/services/config';
import { API_BASE_URL } from '~/constants';

export const discountService = {
    api: 'api/discount',
    async getAllByProductCode(productCode) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/public/${this.api}/product/${productCode}`, config);
        return response.json();
    },
    async getAll() {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/public/${this.api}`, config);
        return response.json();
    },
    async get(id) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/${id}`, config);
        return response.json();
    },
    async post(discount) {
        const config = postConfig(discount);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
    async put(discount) {
        const config = putConfig(discount);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
    async delete(discount) {
        const config = deleteConfig(discount);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
    async apply(discount, productCode) {
        const config = postConfig(discount, productCode);
        const response = await fetch(`${API_BASE_URL}/${this.api}-product/${productCode}`, config);
        return response.json();
    },
    async remove(discount, productCode) {
        const config = deleteConfig(discount, productCode);
        const response = await fetch(`${API_BASE_URL}/${this.api}-product/${productCode}`, config);
        return response.json();
    },
};
