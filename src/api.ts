import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    headers?: {
        Authorization?: string;
    };
}

const instance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3001/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use(
    (config: CustomAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token) {
            if (!config.headers) {
                config.headers = {};
            }
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

export default instance;
