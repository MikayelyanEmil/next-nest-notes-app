import axios from "axios";

const api = axios.create({
    withCredentials: true,
    baseURL: process.env.BACKEND_URL
});

//document.cookie.split(';').filter((c) => c.includes('access_token'))[0]?.split('=')[1]
api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
})

export default api;