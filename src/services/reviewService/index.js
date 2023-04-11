import { deleteConfig, getConfig, postConfig, putConfig } from '~/services/config';
import { API_BASE_URL } from '~/constants';

export const reviewService = {
    api: 'api/review',
    async getReviews(productCode) {
        //classLessonId
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/public/${this.api}/${productCode}`, config);
        return response.json();
    },
    async getReviewByUser(productCode) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/public/${this.api}/${productCode}/user`, config);
        return response.json();
    },
    async postReview(review) {
        const config = postConfig(review);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },

    async put(review) {
        const config = putConfig(review);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },

    async delete(review) {
        const config = deleteConfig(review);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
};
