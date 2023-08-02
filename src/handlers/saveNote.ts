interface NoteBody {
    title: string,
    description: string,
    id?: string
}

export const saveNote = async (event: any, noteId: string, setNoteId: any, setBody: any, setIsAuthorized: any, setLoading: any ) => {
    event.preventDefault();
    try {
        const body: NoteBody = { title: event.target.title.value, description: event.target.description.value }
        const access_token = document.cookie.split(';').filter((c) => c.includes('access_token'))[0]?.split('=')[1];
        let endpoint;
        if (noteId) {
            body.id = noteId;
            endpoint = 'update';
        }
        else endpoint = 'create';
        const response = await fetch(`${process.env.BACKEND_URL}/notes/${endpoint}`, {
            method: 'Post',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "bearer " + access_token
            },
            body: JSON.stringify(body),
            mode: 'cors'
        });
        if (!response.ok) {
            setBody([]);
            return setIsAuthorized(false);
        }
        await response.json();
        await setNoteId('');
    } catch (error) {
        setLoading(true);
    }
}