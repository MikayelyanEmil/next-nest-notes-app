import { AppInput } from '@/components/Input/Input';
import styles from '../styles/Signup.module.css'
import { useRouter } from 'next/router';
import { AppButton } from '@/components/Button/Button';


export default function signup() {
  const router = useRouter();

  const submit = async (event: any) => {
    event.preventDefault();
    const body = { name: event.target.name.value, email: event.target.email.value, password: event.target.password.value }

    const data = await fetch(`http://localhost:3001/users/signup`, {
      method: 'Post',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      mode: 'cors'
    });
    const { access_token } = await data.json();
    document.cookie = "access_token=" + access_token;
    router.push('/dashboard')
  }

  return (
    <form onSubmit={(e) => submit(e)} className={styles.form} method='Post'>
      <AppInput text={'Name'} type={'text'} name={'name'} />
      <br />
      <AppInput text={'Email'} type={'email'} name={'email'} />
      <br />
      <AppInput text={'Password'} type={'password'} name={'password'} />
      <center><AppButton type='submit' text='Create Account' variant='primary' color='#1c0e7b' /></center>
    </form>
  )
}
