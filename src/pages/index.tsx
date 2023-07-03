import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { Button } from '../components/Button/Button'
import { NoteCard } from '@/components/NoteCard/NoteCard'
import { Input } from '@/components/Input/Input'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { submit } from '@/handlers/login'
import Login from '@/components/LoginForm/Login'
import Image from 'next/image'
import loadingImage from '@/icons/Infinity-1s-200px.svg'

export default function Home() {
    let [body, setBody] = useState([]);
    let [noteId, setNoteId] = useState('');
    const [showForm, setShowForm] = useState(true);
    const [authorized, setAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);

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
                    setLoading(false);
                    setBody([<h1>Unauthorized: Sign Up</h1>]);
                    return;
                }
                setAuthorized(true);
                setLoading(false);
                const notes = await response.json();

                setBody(notes);
            } catch (error) {
                setBody([<h1>Internal Server Error: 500</h1>]);
            }
        }
        fetcNotes()
    });

    const handleNew = () => {
        setShowForm(!showForm);
    }

    const handleSave = async (event: any) => {
        event.preventDefault();
        try {
            const body = { title: event.target.title.value, description: event.target.description.value, id: noteId }
            const access_token = document.cookie.split(';').filter((c) => c.includes('access_token'))[0]?.split('=')[1];
            const endpoint = noteId ? 'update' : 'create';
            const response = await fetch(`http://localhost:3001/notes/${endpoint}`, {
                method: 'Post',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "bearer " + access_token
                },
                body: JSON.stringify(body),
                mode: 'cors'
            });
            if (!response.ok) {
                setAuthorized(false);
                setBody([<h1>Unauthorized: Sign Up</h1>]);
                return;
            }
            await response.json();
            await setNoteId('');
        } catch (error) {
            setBody([<h1>Internal Server Error: 500</h1>]);
        }

    }

    return (
        <div className={styles.container}>
            {loading ? <center><Image src={loadingImage} alt='Loading' width={100} height={100}/></center> : authorized ?
                <>
                    <h2>Welcome !</h2>
                    <div className={styles.seperator}>
                        {!showForm || <Button text='Add New Note' variant='primary' onClick={handleNew} />}
                        {showForm ||
                            <form method='post' onSubmit={handleSave}>
                                <Input name={'title'} text={'Title'} type={'text'} id='title' />
                                <Input name={'description'} text={'Add description'} type={'text'} id='description' />
                                <Button text='Save Note' variant='primary' type='submit' />
                            </form>
                        }
                    </div>
                    <div className={styles.seperator}>
                        {body.map((n) => <NoteCard title={n.title} description={n.description} id={n['_id']} show={setShowForm} setId={setNoteId} />)}
                    </div>
                </>
                :
                <div className={styles.seperator}>
                    <center>
                        {/* {body} */}
                        <Login />
                    </center>
                </div>
            }
        </div>
    )
}
