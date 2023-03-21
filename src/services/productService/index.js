import { deleteConfig, getConfig, postConfig, putConfig } from '~/services/config';
import { API_BASE_URL } from '~/constants';

export const productService = {
    api: 'api/product',
    async getProducts(pageNo, categoryCode, manufacturerCode) {
        //classLessonId
        const config = getConfig();
        let paramUrl = '';
        if (categoryCode) {
            paramUrl = '?categoryCode=' + categoryCode;
        } else {
            paramUrl = '?manufacturerCode=' + manufacturerCode;
        }
        if (pageNo) {
            if (paramUrl === '') {
                paramUrl = '?pageNo=' + pageNo;
            } else {
                paramUrl += '&pageNo=' + pageNo;
            }
        } else {
            pageNo = 0;
        }
        const response = await fetch(`${API_BASE_URL}/public/${this.api}${paramUrl}`, config);
        return response.json();
    },
    async searchByName(name) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/public/${this.api}/search/${name}`, config);
        return response.json();
    },
    async getAllProducts() {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/public/${this.api}/all`, config);
        return response.json();
    },
    async getAllProductDetailsByName(name) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/public/${this.api}/details/${name}`, config);
        return response.json();
    },
    async getAllProductDetails() {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/public/${this.api}/details`, config);
        return response.json();
    },
    async getProductByCode(code) {
        //classLessonId
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/public/${this.api}/${code}`, config);
        return response.json();
    },
    async postProduct(product) {
        const config = postConfig(product);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
    async putProduct(product) {
        const config = putConfig(product);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
    async deleteProduct(product) {
        const config = deleteConfig(product);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
    async favoriteProduct(productCode) {
        const config = postConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/favorite/${productCode}`, config);
        return response.json();
    },
    async checkFavoritedProduct(productCode) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/favorite/${productCode}`, config);
        return response.json();
    },
    async getFavoritedProductsByUser() {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/favorite`, config);
        return response.json();
    },
};
