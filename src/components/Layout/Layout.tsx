import Link from 'next/link'
import styles from './Layout.module.css'
import Navbar from '../Navbar/Navbar'

export default function Layout({ children, isAuthorized, setIsAuthorized, loading, setLoading, signup, showSignup, user, setUser, setBody }) {
  return (
    <>
      <header>
        <Navbar isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized} loading={loading} setLoading={setLoading} signup={signup} showSignup={showSignup} user={user} setUser={setUser} setBody={setBody} />
      </header>
      <main className={styles.main}>
        {children}
      </main>
      <footer></footer>
    </>
  )
}
