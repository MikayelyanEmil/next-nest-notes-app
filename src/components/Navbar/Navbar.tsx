import Link from 'next/link'
import React from 'react'
import styles from './Navbar.module.css'
import { useRouter } from 'next/router'

export default function Navbar() {
    const router = useRouter();
    if (router.pathname === '/signup') {
        return (
            <nav className={styles.navbar}>
                {/* <Link className={styles.link} href='/signup'>Sign Up</Link> */}
                <Link className={styles.link} href='/'>Log In</Link>
            </nav>
        )
    }
    return (
        <nav className={styles.navbar}>
            <Link className={styles.link} href='/signup'>Sign Up</Link>
            {/* <Link className={styles.link} href='/login'>Log In</Link> */}
        </nav>
    )
}
