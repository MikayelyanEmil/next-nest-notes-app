import React, { useState } from 'react'
import { Input } from '../Input/Input'
import { submit } from '@/handlers/login'
import { Button } from '../Button/Button'
import styles from './Login.module.css'
import Error from '../ErrorMessage/Error'

export default function Login({ setIsAuthorized, setUser }) {
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
            <form onSubmit={(e) => submit(e, setIsAuthorized, showErrorPopup, setUser)} method='Post' className={styles.form}>
                <Input text={'Email'} type={'email'} name={'email'} />
                <br />
                <Input text={'Password'} type={'password'} name={'password'} />
                <br />
                <center><Button type='submit' text='Log in' variant='primary' color='#1c0e7b;' /></center>
            </form>
        </> 

    )
}
