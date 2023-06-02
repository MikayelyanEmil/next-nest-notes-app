import styles from '../styles/Signup.module.css'
import { useRouter } from 'next/router';


export default function signup() {
  const router = useRouter();

  const submit = async (event: any) => {
    event.preventDefault();
    const body = { email: event.target.email.value, password: event.target.password.value }

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
    router.push('/')
  }

  return (
    <form onSubmit={(e) => submit(e)} className={styles.form} method='Post'>
      <label htmlFor="email" className={styles.label}>Your Email</label>
      <input type="email" name='email' className={styles.input} required/>
      <label htmlFor="password" className={styles.label}>Enter Password</label>
      <input type="password" name='password' className={styles.input} required/>
      <button type='submit' className={styles.button}>Create Account</button>
    </form>
  )
}
