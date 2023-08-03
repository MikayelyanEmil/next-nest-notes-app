import api from "@/http";
import { AuthResponse } from "@/interfaces/AuthResponse";
import { AxiosError } from "axios";

export const submit = async (event: any, setIsAuthorized: any, showErrorPopup: any, setUser: any) => {
    event.preventDefault();
    const body = { name: event.target.name.value, email: event.target.email.value, password: event.target.password.value }
    try {
        const response = await api.post<AuthResponse>('auth/signup', body);
        const { access_token, user } = await response.data
        setUser(user)
        document.cookie = "access_token=" + access_token;
        setIsAuthorized(true)
    } catch (error: any) {
        if (error.response) {
            showErrorPopup(error.response.data.message);
        }
        else {
            showErrorPopup('Internal Server Error.');
        }
    }
}