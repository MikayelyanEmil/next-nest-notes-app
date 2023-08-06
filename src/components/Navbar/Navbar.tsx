import React, { useEffect, useState } from 'react'
import styles from './Navbar.module.css'
import { useRouter } from 'next/router'
import { Button } from '../Button/Button'
import { logout } from '@/handlers/logout'


interface INavbar {
    isAuthorized: boolean,
    setIsAuthorized: any, 
    loading: boolean, 
    setLoading: any, 
    signup: boolean, 
    showSignup: any, 
    user: string, 
    setUser: any, 
    setBody: any,
    lever: boolean,
    runFetch: any
}

const Navbar: React.FC<INavbar> = ({ isAuthorized, setIsAuthorized, loading, setLoading, signup, showSignup, user, setUser, setBody, lever, runFetch }) => {
    const router = useRouter();
    // const logOut = async () => {
    //     await setBody([]);
    //     setLoading(true);
    //     document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    //     setUser(''); 
    //     setIsAuthorized(false);
    //     runFetch(!lever);
    // }


    return (
        <nav className={styles.navbar}>
            {loading ? <></> : isAuthorized ? <><h1 className={styles.title}>Welcome, {user} !</h1><Button text='Log Out' variant='secondary' onClick={() => logout(setLoading, setBody, setUser, setIsAuthorized)} /></>
            : <> <h1 className={styles.title}>The Web Notes</h1> {signup ? <Button text='Log In' variant='secondary' onClick={() => showSignup(false)} /> : 
              <Button text='Sign Up' variant='secondary' onClick={() => showSignup(true)} />}
              </>
            }
        </nav>
    )
}
export default Navbar;
