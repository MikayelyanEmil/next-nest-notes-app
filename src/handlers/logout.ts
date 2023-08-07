import api from "@/http";

export const logout = async (setLoading: any, setBody: any, setUser: any, setIsAuthorized: any, setError: any) => {
    try {
        // setLoading(true);
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
        // setLoading(false);
    } catch (error: any) {
        localStorage.removeItem('token');
        setBody([]);
        setUser('');
        setIsAuthorized(false);
    }

}