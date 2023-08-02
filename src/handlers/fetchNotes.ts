export const fetcNotes = async (setBody: any, setIsAuthorized: any, setLoading: any, setUser: any) => {
    const access_token = document.cookie.split(';').filter((c) => c.includes('access_token'))[0]?.split('=')[1];
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/notes`, {
            method: 'Get',
            headers: {
                'Authorization': 'bearer ' + access_token
            }
        });
        if (!response.ok) {
            setBody([]);
            setIsAuthorized(false);
            return setLoading(false);
        }
        
        const { user, notes } = await response.json();
        await setBody(notes.reverse());
        await setUser(user);
        await setIsAuthorized(true);
        await setLoading(false);
    } catch (error) {
        setLoading(true);
    }
}