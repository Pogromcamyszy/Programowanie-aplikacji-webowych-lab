import axios from 'axios';
import { getAccessToken } from './user';

console.log("axios instance created");
console.log("API URL:", import.meta.env.VITE_API_URL);

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const { getToken, setToken } = (() => {
    let token: string;

    return {
        getToken: async () => {
            if (token) {
                const tokenData = JSON.parse(atob(token.split('.')[1]));
                const now = Math.floor(Date.now() / 1000);
                if (tokenData.exp > now) {
                    return token;
                }
            }

            try {
                const result = await getAccessToken()
                if (result) {
                    token = result;

                    return token
                }

                throw new Error("Failed to fetch access token");
            } catch (error) {
                throw error
            }
        },
        setToken: (newToken: string) => {
            token = newToken;
        }
    }
})()

// create an interceptor to add the token to the request headers
axiosInstance.interceptors.request.use(
    async (config) => {
        try {
            console.log('hello from axios interceptor');
            const token = await getToken();

            config.headers['Authorization'] = `Bearer ${token}`;

            return config;
        } catch (error) {
            throw error
        }
    },

);
