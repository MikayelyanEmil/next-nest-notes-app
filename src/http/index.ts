import axios from "axios";

const api = axios.create({
    withCredentials: true,
    baseURL: process.env.BACKEND_URL
});

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${document.cookie.split(';').filter((c) => c.includes('access_token'))[0]?.split('=')[1]}`;
    return config;
})

export default api;