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
import Error from '@/components/ErrorMessage/Error';

interface IHome {
    isAuthorized: boolean,
    setIsAuthorized: any,
    loading: boolean,
    setLoading: any,
    signup: boolean,
    setUser: any,
    body: any[],
    setBody: any,
    lever: boolean,
    runFetch: any,
    error: any,
    setError: any
}

interface NoteBody {
    title: string,
    description: string,
    id?: string
}

const Home: React.FC<IHome> = ({ isAuthorized, setIsAuthorized, loading, setLoading, signup, setUser, body, setBody, lever, runFetch, error, setError }) => {
    let [noteId, setNoteId] = useState('');
    const [showCreateForm, setShowCreateForm] = useState(false);
    // const [error, setError] = useState('');


    const [errorMessage, setErrorMessage] = useState("");
    const showErrorPopup = (message: any, duration = 1500) => {
        setErrorMessage(message);

        setTimeout(() => {
            hideErrorPopup();
        }, duration)
    };
    const hideErrorPopup = () => {
        setErrorMessage("");
    };


    useEffect(() => {
        fetcNotes(setBody, setIsAuthorized, setLoading, setUser, setError, showErrorPopup);
    }, [lever]);

    return (
        <div className={styles.container}>
            {errorMessage && (
                <Error message={errorMessage} onClose={hideErrorPopup} />
            )}
            {loading ? <div className={styles.loading}><Image src={loadingImage} alt='Loading' width={100} height={100} /></div> :
                error ? <center><div className={styles.error_card}><h3 className={styles.error_title} >{error}</h3></div></center> :
                    isAuthorized ?
                        <>
                            <div className={styles.seperator}>
                                {showCreateForm ?
                                    <form method='post' onSubmit={(e) => saveNote(e, noteId, setNoteId, setBody, setIsAuthorized, setLoading, lever, runFetch, setError, setUser, showErrorPopup)} className={styles.createNoteForm}>
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
                                {body.map((n: any) => <NoteCard key={n['_id']} title={n.title} description={n.description} id={n['_id']} show={setShowCreateForm} setId={setNoteId} setIsAuthorized={setIsAuthorized} lever={lever} runFetch={runFetch} setUser={setUser} setBody={setBody} setError={setError} showErrorPopup={showErrorPopup} />)}
                            </div>
                        </>
                        :
                        <div className={styles.seperator}>
                            <center>
                                {signup ?
                                    <Signup setIsAuthorized={setIsAuthorized} setUser={setUser} lever={lever} runFetch={runFetch} setError={setError} /> :
                                    <Login setIsAuthorized={setIsAuthorized} setUser={setUser} lever={lever} runFetch={runFetch} setError={setError} />
                                }
                            </center>
                        </div>
            }
        </div>
    )
}
export default Home;
