import { deleteConfig, getConfig, postConfig, putConfig } from '~/services/config';
import { API_BASE_URL } from '~/constants';

export const productImageService = {
    api: 'api/product-image',
    async getProductImagesByProductCode(code) {
        //classLessonId
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/public/${this.api}/${code}`, config);
        return response.json();
    },
    async postProductImage(productImage) {
        const config = postConfig(productImage);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
};
