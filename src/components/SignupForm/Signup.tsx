import React, { useState } from 'react'
import { Input } from '../Input/Input'
import { submit } from '@/handlers/signup'
import { Button } from '../Button/Button'
import styles from './Signup.module.css'
import Error from '../ErrorMessage/Error'

interface ISignup {
  setIsAuthorized: any,
  setUser: any,
  lever: boolean,
  runFetch: any,
  setError: any
}

const Signup: React.FC<ISignup> = ({ setIsAuthorized, setUser, lever, runFetch, setError }) => {
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
      <form onSubmit={(e) => submit(e, setIsAuthorized, showErrorPopup, setUser, lever, runFetch, setError)} className={styles.form} method='Post'>
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
export default Signup;