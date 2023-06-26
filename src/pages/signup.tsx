import { Input } from '@/components/Input/Input';
import styles from '../styles/Signup.module.css'
import { useRouter } from 'next/router';
import { Button } from '@/components/Button/Button';


export default function signup() {
  const router = useRouter();

  const submit = async (event: any) => {
    event.preventDefault();
    const body = { name: event.target.name.value, email: event.target.email.value, password: event.target.password.value }

    const response = await fetch(`http://localhost:3001/users/signup`, {
      method: 'Post',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      mode: 'cors'
    });
    if (!response.ok) {
      throw new Error('Bad request')
    }

    const { access_token } = await response.json();
    document.cookie = "access_token=" + access_token;
    router.push('/')
  }

  return (
    <form onSubmit={(e) => submit(e)} className={styles.form} method='Post'>
      <Input text={'Name'} type={'text'} name={'name'} />
      <br />
      <Input text={'Email'} type={'email'} name={'email'} />
      <br />
      <Input text={'Password'} type={'password'} name={'password'} />
      <center><Button type='submit' text='Create Account' variant='primary' color='#1c0e7b' /></center>
    </form>
  )
}
