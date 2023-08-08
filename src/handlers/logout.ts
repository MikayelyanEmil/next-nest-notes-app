import axios from "axios";

export const logout = async (setLoading: any, setBody: any, setUser: any, setIsAuthorized: any, setError: any) => {
    try {
        await fetch(`${process.env.BACKEND_URL}/auth/logout`, {
            method: "Post",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
            credentials: "include"
        });

        localStorage.removeItem('token');
        setBody([]);
        setUser('');
        setIsAuthorized(false);
    } catch (error: any) {
        setBody([]);
        setUser('');
        setIsAuthorized(false);        
        setError('Internal Server Error');
    }

}