export const submit = async (event: any, setIsAuthorized, showErrorPopup) => {
    event.preventDefault();
    const body = { name: event.target.name.value, email: event.target.email.value, password: event.target.password.value }
    try {
        const response = await fetch(`http://localhost:3001/users/signup`, {
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
        const { access_token } = await response.json();
        document.cookie = "access_token=" + access_token;
        setIsAuthorized(true)
    } catch (error) {
        showErrorPopup('Internal Server Error.');
    }
}