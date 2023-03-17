import { deleteConfig, getConfig, postConfig, putConfig } from '~/services/config';
import { API_BASE_URL } from '~/constants';

export const manufacturerService = {
    api: 'api/manufacturer',
    async getManufacturers() {
        //classLessonId
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/public/${this.api}`, config);
        return response.json();
    },
    async getManufacturerByProductCode(productCode) {
        //classLessonId
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/public/${this.api}/${productCode}`, config);
        return response.json();
    },
    async getManufacturerByCode(code) {
        //classLessonId
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/public/${this.api}/code/${code}`, config);
        return response.json();
    },
    async postManufacturer(manufacturer) {
        //classLessonId
        const config = postConfig(manufacturer);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
    async putManufacturer(manufacturer) {
        //classLessonId
        const config = putConfig(manufacturer);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
    async deleteManufacturer(manufacturer) {
        //classLessonId
        const config = deleteConfig(manufacturer);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
};
