import api from "@/http";
import { AxiosError } from "axios";
import { NoteBody } from "@/interfaces/NoteBody";

export const saveNote = async (event: any, noteId: string, setNoteId: any, setBody: any, setIsAuthorized: any, setLoading: any, lever: boolean, runFetch: any, setError: any) => {
    event.preventDefault();
    try {
        const body: NoteBody = { title: event.target.title.value, description: event.target.description.value }
        let endpoint;
        if (noteId) {
            body.id = noteId;
            endpoint = 'update';
        }
        else endpoint = 'create';
        const response = await api.post(`notes/${endpoint}`, body);
        setNoteId('');
        runFetch(!lever);
    } catch (error: any) {
        if (error.response?.status == 403) {
            setError(error.response.data.message)
        } else {
            setBody([]);
            setIsAuthorized(false);
        }
    }
}