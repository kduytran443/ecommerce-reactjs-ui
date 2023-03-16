import { deleteConfig, getConfig, postConfig, putConfig } from '~/services/config';
import { API_BASE_URL } from '~/constants';

export const productInfoService = {
    api: 'api/product-info',
    async getProductInfoByCode(code) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/public/${this.api}/${code}`, config);
        return response.json();
    },
    async postProductInfo(productInfo) {
        const config = postConfig(productInfo);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
    async putProductInfo(productInfo) {
        const config = putConfig(productInfo);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
};
