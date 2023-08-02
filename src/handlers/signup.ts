// export const submit = async (event: any, setIsAuthorized: any, showErrorPopup: any, setUser: any) => {
//     event.preventDefault();
//     const body = { name: event.target.name.value, email: event.target.email.value, password: event.target.password.value }
//     try {
//         const response = await fetch(`${process.env.BACKEND_URL}/users/signup`, {
//             method: 'Post',
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(body),
//             mode: 'cors'
//         });
//         if (!response.ok) {
//             return showErrorPopup((await response.json()).message);
//         }
//         const { access_token, user } = await response.json();
//         setUser(user)
//         document.cookie = "access_token=" + access_token;
//         setIsAuthorized(true)
//     } catch (error) {
//         showErrorPopup('Internal Server Error.');
//     }
// }
import api from "@/http";
import { AuthResponse } from "@/interfaces/authResponse";

export const submit = async (event: any, setIsAuthorized: any, showErrorPopup: any, setUser: any) => {
    event.preventDefault();
    const body = { name: event.target.name.value, email: event.target.email.value, password: event.target.password.value }
    try {
        const response = await api.post<AuthResponse>('users/signup', {name: body.name, email: body.email, password: body.password});
        console.log(response.data);
        
        // if (!response.ok) {
        //     return showErrorPopup((await response.json()).message);
        // }
        const { access_token, user } = await response.data
        setUser(user)
        document.cookie = "access_token=" + access_token;
        setIsAuthorized(true)
    } catch (error) {
        console.log(error);
        
        showErrorPopup('Internal Server Error.');
    }
}