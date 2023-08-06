import api from "@/http";
import { NotesResponse } from "@/interfaces/NotesResponse";
import { AxiosError } from "axios";


export const fetcNotes = async (setBody: any, setIsAuthorized: any, setLoading: any, setUser: any, setError: any) => {
    try {
        setError('');
        const response = await api.get<NotesResponse>('notes');
        const { user, notes } = response.data;
        setBody(notes.reverse());
        setUser(user);
        setIsAuthorized(true);
    } catch (error: any) {
        if (error.response?.status == 403) { 
            setIsAuthorized(true);
            setError(error.response.data.message)
        }
        else {
            setUser('');
            setBody([]);
            setIsAuthorized(false); 
            if (!error.response) setError('Internal Server Error');
        }
    }
    setLoading(false)
}