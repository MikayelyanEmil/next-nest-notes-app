export const submit = async (event: any) => {
    event.preventDefault();
    const body = { email: event.target.email.value, password: event.target.password.value }

    const data = await fetch(`http://localhost:3001/users/login`, {
        method: 'Post',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        mode: 'cors'
    });
    const { access_token } = await data.json();
    document.cookie = "access_token=" + access_token;
}