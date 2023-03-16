import { deleteConfig, getConfig, postConfig, putConfig } from '~/services/config';
import { API_BASE_URL } from '~/constants';

export const productSpecificationService = {
    api: 'api/product-specification',
    async getProductSpecificationByProductCode(productCode) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/public/${this.api}/${productCode}`, config);
        return response.json();
    },
    async postProductSpecification(specification) {
        const config = postConfig(specification);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
};
