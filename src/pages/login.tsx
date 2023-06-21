import { AppButton } from '@/components/Button/Button'
import { AppInput } from '@/components/Input/Input'
import { useRouter } from 'next/router'
import React from 'react'
import styles from '../styles/Login.module.css'

export default function login() {
    const router = useRouter();
    const submit = async (event: any) => {
        event.preventDefault();
        const body = { email: event.target.email.value, password: event.target.password.value }

        const data = await fetch(`http://localhost:3001/users/login`, {
            method: 'Post',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
            mode: 'cors'
        });
        const { access_token } = await data.json();
        document.cookie = "access_token=" + access_token;
        router.push('/')
    }


    return (
        <form onSubmit={(e) => submit(e)} method='Post' className={styles.form}>
            <AppInput text={'Email'} type={'email'} name={'email'} />
            <br />
            <AppInput text={'Password'} type={'password'} name={'password'} />
            <center><AppButton type='submit' text='Log in' variant='primary' color='#1c0e7b;' /></center>
        </form>

    )
}
