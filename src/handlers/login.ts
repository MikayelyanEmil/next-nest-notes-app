import api from "@/http";
import { AxiosError } from 'axios'
import { AuthResponse } from "@/interfaces/AuthResponse";
import { AxiosResponse } from "axios";

export const submit = async (event: any, setIsAuthorized: any, showErrorPopup: any, setUser: any, lever: boolean, runFetch: any) => {
    event.preventDefault();
    const body = { email: event.target.email.value, password: event.target.password.value }
    try {
        const response = await api.post<AuthResponse>('auth/login', body);
        const { access_token, user } = await response.data;
        setUser(user);
        localStorage.setItem('token', access_token);
        runFetch(!lever);
        setIsAuthorized(true);
    } catch (error: any) {
        if (error.response) {
            showErrorPopup(error.response.data.message);
        }
        else {
            showErrorPopup('Internal Server Error.');
        }
    }
}