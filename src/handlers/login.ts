import api from "@/http";
import { AxiosError } from 'axios'
import { AuthResponse } from "@/interfaces/AuthResponse";
import { AxiosResponse } from "axios";

export const submit = async (event: any, setIsAuthorized: any, showErrorPopup: any, setUser: any) => {
    event.preventDefault();
    const body = { email: event.target.email.value, password: event.target.password.value }
    try {
        const response = await api.post<AuthResponse>('auth/login', body);
        const { access_token, user } = await response.data;
        console.log(user);
        
        setUser(user);
        document.cookie = "access_token=" + access_token;
        setIsAuthorized(true);
    } catch (error: any) {
        if (error.response) {
            console.log(error);
            
            showErrorPopup(error.response.data.message);
        }
        else {
            showErrorPopup('Internal Server Error.');
        }
    }
}