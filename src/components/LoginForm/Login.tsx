import React, { useState } from 'react'
import { Input } from '../Input/Input'
import { submit } from '@/handlers/login'
import { Button } from '../Button/Button'
import styles from './Login.module.css'
import Error from '../ErrorMessage/Error'

interface ILogin {
    setIsAuthorized: any,
    setUser: any,
    lever: boolean,
    runFetch: any
}

const Login: React.FC<ILogin> = ({ setIsAuthorized, setUser, lever, runFetch }) => {
    const [errorMessage, setErrorMessage] = useState("");
    const showErrorPopup = (message: any, duration = 1500) => {
        setErrorMessage(message);

        setTimeout(() => {
            hideErrorPopup();
        }, duration)
    };
    const hideErrorPopup = () => {
        setErrorMessage("");
    };

    return (
        <>
            {errorMessage && (
                <Error message={errorMessage} onClose={hideErrorPopup} />
            )}
            <form onSubmit={(e) => submit(e, setIsAuthorized, showErrorPopup, setUser, lever, runFetch)} method='Post' className={styles.form}>
                <Input text={'Email'} type={'email'} name={'email'} />
                <br />
                <Input text={'Password'} type={'password'} name={'password'} />
                <br />
                <center><Button type='submit' text='Log in' variant='primary' color='#1c0e7b;' /></center>
            </form>
        </>

    )
}
export default Login;