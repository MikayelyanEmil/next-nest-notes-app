import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styles from './Navbar.module.css'
import { useRouter } from 'next/router'
import { Button } from '../Button/Button'

interface INavbar {
    isAuthorized: boolean,
    setIsAuthorized: any, 
    loading: boolean, 
    setLoading: any, 
    signup: boolean, 
    showSignup: any, 
    user: string, 
    setUser: any, 
    setBody: any
}

const Navbar: React.FC<INavbar> = ({ isAuthorized, setIsAuthorized, loading, setLoading, signup, showSignup, user, setUser, setBody }) => {
    const router = useRouter();
    const logOut = async () => {
        await setBody([]);
        await setLoading(true);
        document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        await setUser('');
        await setIsAuthorized(false);
    }

    return (
        <nav className={styles.navbar}>
            {loading ? <></> : isAuthorized ? <><h1 className={styles.title}>Welcome, {user} !</h1><Button text='Log Out' variant='secondary' onClick={logOut} /></>
            : <> <h1 className={styles.title}>The Web Notes</h1> {signup ? <Button text='Log In' variant='secondary' onClick={() => showSignup(false)} /> : 
              <Button text='Sign Up' variant='secondary' onClick={() => showSignup(true)} />}
              </>
            }
        </nav>
    )
}
export default Navbar;
