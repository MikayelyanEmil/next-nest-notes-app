import { Input } from '@/components/Input/Input';
import styles from '../styles/Signup.module.css'
import { useRouter } from 'next/router';
import { Button } from '@/components/Button/Button';
import { useState } from 'react';
import Error  from '@/components/ErrorMessage/Error';


export default function signup() {
  const [body, setBody] = useState('');
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");
  const showErrorPopup = (message: any, duration = 2000) => {
    setErrorMessage(message);

    setTimeout(() => {
      hideErrorPopup();
    }, duration)
  };
  const hideErrorPopup = () => {
    setErrorMessage("");
  };

  const submit = async (event: any) => {
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
        // setBody((await response.json()).message);
        showErrorPopup((await response.json()).message);
        return;
      }
      const { access_token } = await response.json();
      document.cookie = "access_token=" + access_token;
    } catch (error) {
    }

    // router.push('/')
  }

  return (
    <center>
      {errorMessage && (
        <Error message={errorMessage} onClose={hideErrorPopup} />
      )}
      <form onSubmit={(e) => submit(e)} className={styles.form} method='Post'>
        <Input text={'Name'} type={'text'} name={'name'} />
        <br />
        <Input text={'Email'} type={'email'} name={'email'} />
        <br />
        <Input text={'Password'} type={'password'} name={'password'} />
        <center><Button type='submit' text='Create Account' variant='primary' color='#1c0e7b' /></center>
      </form>
    </center>

  )
}
