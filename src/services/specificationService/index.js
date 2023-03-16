import { deleteConfig, getConfig, postConfig, putConfig } from '~/services/config';
import { API_BASE_URL } from '~/constants';

export const specificationService = {
    api: 'api/specification',
    async getSpecificationByCode(categoryCode) {
        //classLessonId
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/public/${this.api}/${categoryCode}`, config);
        return response.json();
    },

    async postSpecification(specification) {
        const config = postConfig(specification);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },

    async putSpecification(specification) {
        const config = putConfig(specification);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },

    async deleteSpecification(specification) {
        const config = deleteConfig(specification);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
};
