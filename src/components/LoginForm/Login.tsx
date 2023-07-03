import React from 'react'
import { Input } from '../Input/Input'
import { submit } from '@/handlers/login'
import { Button } from '../Button/Button'
import styles from './Login.module.css'

export default function Login() {
    return (
        <form onSubmit={(e) => submit(e)} method='Post' className={styles.form}>
                <Input text={'Email'} type={'email'} name={'email'} />
                <br />
                <Input text={'Password'} type={'password'} name={'password'} />
                <center><Button type='submit' text='Log in' variant='primary' color='#1c0e7b;' /></center>
        </form>
    )
}
