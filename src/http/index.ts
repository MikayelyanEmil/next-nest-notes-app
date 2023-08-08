import { AuthResponse } from "@/interfaces/AuthResponse";
import axios, { AxiosError } from "axios";

const api = axios.create({
    withCredentials: true,
    baseURL: process.env.BACKEND_URL
});

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
})

api.interceptors.response.use(config => config, async (error) => {
    const originalRequest = error.config;
    const except = error.config.url != 'auth/login' && error.config.url != 'auth/signup';
    if (error.response?.status == 401 && error.config && !error.config._isRetry && except) {
        originalRequest._isRetry = true;
        const response = await axios.post<AuthResponse>(`http://localhost:3001/auth/refresh`, {}, {withCredentials: true})
        localStorage.setItem('token', response.data.access_token);
        return api.request(originalRequest);
    }
    else throw error;
})

export { api };