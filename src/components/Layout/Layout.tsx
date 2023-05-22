import styles from './Layout.module.css'

export default function Layout({children}) {
  return (
    <main className={styles.main}>
        {children}
    </main>
  )
}
