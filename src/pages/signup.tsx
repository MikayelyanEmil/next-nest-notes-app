import styles from '../styles/Signup.module.css'

export default function signup() {
  return (
    <form action={process.env.BACKEND_URL + '/users/new'} className={styles.form} method='Post'>
      <label htmlFor="email" className={styles.label}>Your Email</label>
      <input type="email" name='email' className={styles.input}/>
      <label htmlFor="password" className={styles.label}>Enter Password</label>
      <input type="password" name='password' className={styles.input} />
      <button type='submit' className={styles.button}>Create Account</button>
    </form>
  )
}
