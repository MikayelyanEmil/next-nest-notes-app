import React, { useState } from 'react'
import { Input } from '../Input/Input'
import { submit } from '@/handlers/signup'
import { Button } from '../Button/Button'
import styles from './Signup.module.css'
import Error from '../ErrorMessage/Error'

export default function Signup({ setIsAuthorized }) {
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
        <center>
            {errorMessage && (
                <Error message={errorMessage} onClose={hideErrorPopup} />
            )}
            <form onSubmit={(e) => submit(e, setIsAuthorized, showErrorPopup)} className={styles.form} method='Post'>
                <Input text={'Name'} type={'text'} name={'name'} />
                <br />
                <Input text={'Email'} type={'email'} name={'email'} />
                <br />
                <Input text={'Password'} type={'password'} name={'password'} />
                <br />
                <center><Button type='submit' text='Create Account' variant='primary' color='#1c0e7b' /></center>
            </form>
        </center>
    )
}
