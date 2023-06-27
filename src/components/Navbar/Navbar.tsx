import Link from 'next/link'
import React from 'react'
import styles from './Navbar.module.css'

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Link className={styles.link} href='/signup'>Sign Up</Link>
            {/* <Link className={styles.link} href='/login'>Log In</Link> */}
        </nav>
    )
}
