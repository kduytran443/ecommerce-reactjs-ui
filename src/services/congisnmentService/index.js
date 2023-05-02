import { deleteConfig, getConfig, postConfig, putConfig } from '~/services/config';
import { API_BASE_URL } from '~/constants';

export const consignmentService = {
    api: 'api/consignment',
    async getConsignments() {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
    async getConsignmentById(id) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/${id}`, config);
        return response.json();
    },
    async getConsignmentByProductCode(productCode) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/product/${productCode}`, config);
        return response.json();
    },
    async postConsignment(consignment) {
        const config = postConfig(consignment);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
    async putConsignment(consignment) {
        const config = putConfig(consignment);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
    async deleteConsignment(consignment) {
        const config = deleteConfig(consignment);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
};
