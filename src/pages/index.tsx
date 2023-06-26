import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { Button } from '../components/Button/Button'
import { NoteCard } from '@/components/NoteCard/NoteCard'
import { Input } from '@/components/Input/Input'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { submit } from '@/handlers/login'

export default function Home() {
    let [body, setBody] = useState([]);
    // let [notes, setNotes] = useState([]);
    const [showForm, setShowForm] = useState(true);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const fetcNotes = async () => {
            const access_token = document.cookie.split(';').filter((c) => c.includes('access_token'))[0]?.split('=')[1];
            try {
                const response = await fetch(`http://localhost:3001/notes`, {
                    method: 'Get',
                    headers: {
                        'Authorization': 'bearer ' + access_token
                    }
                });
                if (!response.ok) {
                    setAuthorized(false);
                    setBody(<h1>Unauthorized: Sign Up</h1>);
                    return;
                }
                const notes = await response.json();
                setAuthorized(true);
                setBody(notes);
            } catch (error) {
                setBody(<h1>Internal Server Error: 500</h1>);
            }
        }
        fetcNotes()
    });

    const handleNew = () => {
        setShowForm(!showForm);
    }

    const handleSave = async (event: any) => {
        event.preventDefault();
        const body = { title: event.target.title.value, description: event.target.description.value }
        const access_token = document.cookie.split(';').filter((c) => c.includes('access_token'))[0].split('=')[1];

        const data = await fetch(`http://localhost:3001/notes/create`, {
            method: 'Post',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "bearer " + access_token
            },
            body: JSON.stringify(body),
            mode: 'cors'
        });
        await data.json();
    }

    return (
        <div className={styles.container}>
            {!authorized ||
                <>
                    <h2>Welcome !</h2>
                    <div className={styles.seperator}>
                        {!showForm || <Button text='Add New Note' variant='primary' onClick={handleNew} />}
                        {showForm ||
                            <form method='post' onSubmit={handleSave}>
                                <Input name={'title'} text={'Title'} type={'text'} />
                                <Input name={'description'} text={'Add description'} type={'text'} />
                                <Button text='Save Note' variant='primary' type='submit' />
                            </form>
                        }
                    </div>
                    <div className={styles.seperator}>
                        {body.map((n) => <NoteCard title={n.title} description={n.description} />)}
                    </div>
                </>
            }

            {authorized ||
                <div className={styles.seperator}>
                    <form onSubmit={(e) => submit(e)} method='Post' className={styles.form}>
                        <Input text={'Email'} type={'email'} name={'email'} />
                        <br />
                        <Input text={'Password'} type={'password'} name={'password'} />
                        <center><Button type='submit' text='Log in' variant='primary' color='#1c0e7b;' /></center>
                    </form>
                </div>
            }
        </div>
    )
}
