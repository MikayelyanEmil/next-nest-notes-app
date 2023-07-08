import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styles from './Navbar.module.css'
import { useRouter } from 'next/router'
import { Button } from '../Button/Button'

export default function Navbar({ isAuthorized, setIsAuthorized, loading, setLoading, signup, showSignup }) {
    const router = useRouter();
    const logOut = async () => {
        document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setIsAuthorized(false);
        setLoading(true);
    }

    return (
        <nav className={styles.navbar}>
            {loading ? <></> : isAuthorized ? <>Welcome<Button text='Log Out' variant='secondary' onClick={logOut} /></>
            : <> NotesApp {signup ? <Button text='Log In' variant='secondary' onClick={() => showSignup(false)} /> : 
              <Button text='Sign Up' variant='secondary' onClick={() => showSignup(true)} />}
              </>
            }
        </nav>
    )
}
