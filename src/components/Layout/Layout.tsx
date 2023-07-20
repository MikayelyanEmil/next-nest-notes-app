import Link from 'next/link'
import styles from './Layout.module.css'
import Navbar from '../Navbar/Navbar'

interface ILayout {
  children: any,
  isAuthorized: boolean
  setIsAuthorized: any, 
  loading: boolean, 
  setLoading: any, 
  signup: boolean, 
  showSignup: any, 
  user: string, 
  setUser: any, 
  setBody: any
}

const Layout: React.FC<ILayout> = ({ children, isAuthorized, setIsAuthorized, loading, setLoading, signup, showSignup, user, setUser, setBody }) => {
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
export default Layout;
