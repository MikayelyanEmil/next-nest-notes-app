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
    runFetch: any,
    setError: any
}

const Navbar: React.FC<INavbar> = ({ isAuthorized, setIsAuthorized, loading, setLoading, signup, showSignup, user, setUser, setBody, lever, runFetch, setError }) => {
    const router = useRouter();
 
    return (
        <nav className={styles.navbar}>
            {loading ? <></> : isAuthorized ? <><h1 className={styles.title}>Welcome {user}</h1><Button text='Log Out' variant='secondary' onClick={() => logout(setLoading, setBody, setUser, setIsAuthorized, setError)} /></>
            : <> <h1 className={styles.title}>The Web Notes</h1> {signup ? <Button text='Log In' variant='secondary' onClick={() => showSignup(false)} /> : 
              <Button text='Sign Up' variant='secondary' onClick={() => showSignup(true)} />}
              </>
            }
        </nav>
    )
}
export default Navbar;
