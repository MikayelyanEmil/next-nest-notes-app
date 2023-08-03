import api from "@/http";
import { NotesResponse } from "@/interfaces/NotesResponse";
import { AxiosError } from "axios";


export const fetcNotes = async (setBody: any, setIsAuthorized: any, setLoading: any, setUser: any) => {
    const access_token = document.cookie.split(';').filter((c) => c.includes('access_token'))[0]?.split('=')[1];
    try {
        const response = await api.get<NotesResponse>('notes');
        const { user, notes } = response.data;
        await setBody(notes.reverse());
        await setUser(user);
        await setIsAuthorized(true);
        await setLoading(false);
    } catch (error: any) {
        if (error.response.status == 403) {
            await setIsAuthorized(true);
            await setLoading(false);
            console.log(error.response.data.message);
        }
        else {
            setBody([]);
            setIsAuthorized(false);
            setLoading(false);
        }
    }
}