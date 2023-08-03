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
import { fetcNotes } from '@/handlers/fetchNotes';
import { saveNote } from '@/handlers/saveNote'

interface IHome {
    isAuthorized: boolean,
    setIsAuthorized: any,
    loading: boolean,
    setLoading: any,
    signup: boolean,
    setUser: any,
    body: any[],
    setBody: any
}

interface NoteBody {
    title: string,
    description: string,
    id?: string
}

const Home: React.FC<IHome> = ({ isAuthorized, setIsAuthorized, loading, setLoading, signup, setUser, body, setBody }) => {
    let [noteId, setNoteId] = useState('');
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetcNotes(setBody, setIsAuthorized, setLoading, setUser);
    });

    return (
        <div className={styles.container}>
            <center><h1>{error && error}</h1></center>
            {loading ? <div className={styles.loading}><Image src={loadingImage} alt='Loading' width={100} height={100} /></div> : isAuthorized ?
                <>
                    <div className={styles.seperator}>
                        {showCreateForm ?
                            <form method='post' onSubmit={(e) => saveNote(e, noteId, setNoteId, setBody, setIsAuthorized, setLoading)} className={styles.createNoteForm}>
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
                        {body.map((n: any) => <NoteCard key={n['_id']} title={n.title} description={n.description} id={n['_id']} show={setShowCreateForm} setId={setNoteId} setIsAuthorized={setIsAuthorized} />)}
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
export default Home;
