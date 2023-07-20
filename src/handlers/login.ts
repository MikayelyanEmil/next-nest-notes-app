export const submit = async (event: any, setIsAuthorized: any, showErrorPopup: any, setUser: any) => {
    event.preventDefault();
    const body = { email: event.target.email.value, password: event.target.password.value }
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/users/login`, {
            method: 'Post',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
            mode: 'cors'
        });
        if (!response.ok) {
            return showErrorPopup((await response.json()).message);
        }
        const { access_token, user } = await response.json();
        setUser(user);
        document.cookie = "access_token=" + access_token;
        setIsAuthorized(true);
    } catch (error) {
        showErrorPopup('Internal Server Error.');
    }
}