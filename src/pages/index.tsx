import styles from '@/styles/Home.module.css'
import { Button } from '../components/Button/Button'
import { NoteCard } from '@/components/NoteCard/NoteCard'
import { Input } from '@/components/Input/Input'
import { useEffect, useState } from 'react'
import Login from '@/components/LoginForm/Login'
import Signup from '@/components/SignupForm/Signup'
import Image from 'next/image'
import loadingImage from '@/icons/Infinity-1s-200px.svg'
import closeIcon from '@/icons/close.svg'

export default function Home({ isAuthorized, setIsAuthorized, loading, setLoading, signup, setUser, body, setBody }) {
    // let [body, setBody] = useState([]);
    let [noteId, setNoteId] = useState('');
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetcNotes = async () => {
            const access_token = document.cookie.split(';').filter((c) => c.includes('access_token'))[0]?.split('=')[1];
            try {
                const response = await fetch(`${process.env.BACKEND_URL}/notes`, {
                    method: 'Get',
                    headers: {
                        'Authorization': 'bearer ' + access_token
                    }
                });
                if (!response.ok) {
                    setIsAuthorized(false);
                    return setLoading(false);
                }
                
                const { user, notes } = await response.json();
                await setBody(notes.reverse());
                setUser(user);
                setIsAuthorized(true);
                setLoading(false);
            } catch (error) {
                // setError('Internal Server Error: 500');
                setLoading(true);
            }
        }
        fetcNotes()
    });

    const handleSave = async (event: any) => {
        event.preventDefault();
        try {
            const body = { title: event.target.title.value, description: event.target.description.value, id: noteId }
            const access_token = document.cookie.split(';').filter((c) => c.includes('access_token'))[0]?.split('=')[1];
            const endpoint = noteId ? 'update' : 'create';
            const response = await fetch(`${process.env.BACKEND_URL}/notes/${endpoint}`, {
                method: 'Post',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "bearer " + access_token
                },
                body: JSON.stringify(body),
                mode: 'cors'
            });
            if (!response.ok) {
                return setIsAuthorized(false);
            }
            await response.json();
            await setNoteId('');
        } catch (error) {
            // setError('Internal Server Error: 500');
            setLoading(true);
        }
    }

    return (
        <div className={styles.container}>
            <center><h1>{error && error}</h1></center>
            {loading ? <div className={styles.loading}><Image src={loadingImage} alt='Loading' width={100} height={100} /></div> : isAuthorized ?
                <>
                    <div className={styles.seperator}>
                        {showCreateForm ?
                            <form method='post' onSubmit={handleSave} className={styles.createNoteForm}>
                                <button className={styles.closeFormBtn} onClick={() => setShowCreateForm(false)}>
                                    <Image src={closeIcon} width={18} height={18} alt='close' />
                                </button>
                                <div>
                                    <div style={{ fontSize: '20px', margin: '5px 0' }}>Title</div>
                                    <textarea className={styles.textareaTitle} name="" id="title"></textarea>
                                    <br />
                                    <div style={{ fontSize: '20px', margin: '5px 0' }}>Description</div>
                                    <textarea className={styles.textareaDescription} name="" id="description"></textarea>
                                </div>
                                <br />
                                <Button text='Save' variant='primary' type='submit' />
                                <br />
                                <br />
                            </form>
                            :
                            <Button text='New Note' variant='primary' onClick={() => setShowCreateForm(true)} />
                        }
                    </div>
                    <div className={styles.seperator}>
                        {body.map((n) => <NoteCard title={n.title} description={n.description} id={n['_id']} show={setShowCreateForm} setId={setNoteId} setIsAuthorized={setIsAuthorized} />)}
                    </div>
                </>
                :
                <div className={styles.seperator}>
                    <center>
                        {signup ?
                            <Signup setIsAuthorized={setIsAuthorized} setUser={setUser} /> :
                            <Login setIsAuthorized={setIsAuthorized} setUser={setUser} />
                        }
                    </center>
                </div>
            }
        </div>
    )
}
