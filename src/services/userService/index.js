import { deleteConfig, getConfig, postConfig, putConfig } from '~/services/config';
import { API_BASE_URL } from '~/constants';

export const userService = {
    api: 'api/user',
    async getUser() {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
    async getAllUser() {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}/all`, config);
        return response.json();
    },
    async getUserByUsername(username) {
        const config = getConfig();
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
    async block(user) {
        const config = deleteConfig(user);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
    async put(user) {
        const config = putConfig(user);
        const response = await fetch(`${API_BASE_URL}/${this.api}`, config);
        return response.json();
    },
    async signUp(user) {
        const config = postConfig(user);
        const response = await fetch(`${API_BASE_URL}/api/sign-up`, config);
        return response.json();
    },
    async updateUserAvatar(user) {
        const config = putConfig(user);
        const response = await fetch(`${API_BASE_URL}/${this.api}/avatar`, config);
        return response.json();
    },
    async signUpAdmin(user) {
        const config = postConfig(user);
        const response = await fetch(`${API_BASE_URL}/api/sign-up/admin`, config);
        return response.json();
    },
};
