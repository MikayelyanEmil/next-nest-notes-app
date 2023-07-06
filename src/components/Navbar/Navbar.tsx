import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styles from './Navbar.module.css'
import { useRouter } from 'next/router'
import { Button } from '../Button/Button'

export default function Navbar() {
    const router = useRouter();
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function set() {
            await setToken(document.cookie.split(';').filter((c) => c.includes('access_token'))[0]?.split('=')[1]);
            await setLoading(false);
        }
        set();
    })

    // return (<>
    //     {loading ? <></> : 
    //         <nav className={styles.navbar}>
    //             { router.pathname === '/signup' ? 
    //                 <Link className={styles.link} href='/'>Log In</Link> : 
    //                 <Link className={styles.link} href='/signup'>Sign Up</Link>
    //             }
    //         </nav> 
    //     }
    //     </>  
    // )
    if (!loading) {
        if (token) {
            if (router.pathname === '/signup') {
                return (
                    <nav className={styles.navbar}>
                        <Link className={styles.link} href='/'>Log In</Link>
                    </nav>
                )
            }
            return (
                <nav className={styles.navbar}>
                    <Link className={styles.link} href='/signup'>Sign Up</Link>
                </nav>
            )
        }
        else {
            return (
                <nav className={styles.navbar}>
                    <Button text='Log Out' variant='primary' />
                </nav>
            )
        }
    }

}
