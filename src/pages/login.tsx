import { Button } from '@/components/Button/Button'
import { Input } from '@/components/Input/Input'
import { useRouter } from 'next/router'
import React from 'react'
import styles from '../styles/Login.module.css'
import { NoteCard } from '@/components/NoteCard/NoteCard'
import Login from '@/components/LoginForm/Login'

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
        <Login />
    )
}
