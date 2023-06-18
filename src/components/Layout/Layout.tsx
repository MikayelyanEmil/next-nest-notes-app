import Link from 'next/link'
import styles from './Layout.module.css'
import Navbar from '../Navbar/Navbar'

export default function Layout({children}) {
  return (
    <>
    <header>
      <Navbar />
    </header>
    <main className={styles.main}>
        {children}
    </main>
    <footer></footer>
    </>
  )
}
