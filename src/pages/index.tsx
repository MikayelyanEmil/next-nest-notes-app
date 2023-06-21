import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { AppButton } from '../components/Button/Button'
import { NoteCard } from '@/components/NoteCard/NoteCard'
import { AppInput } from '@/components/Input/Input'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ok } from 'assert'

export default function Home() {
    let [notes, setNotes] = useState([]);
    const [addNewNote, setAddNewNote] = useState(true);

    useEffect(() => {
        const fetcNotes = async () => {
            const access_token = document.cookie.split(';').filter((c) => c.includes('access_token'))[0].split('=')[1];

            const response = await fetch(`http://localhost:3001/notes`, {
                method: 'Get',
                headers: {
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (!response.ok) {
                console.log(response);
                return;
            }
            const notes = await response.json();
            setNotes(notes);
            // console.log(notes);
        }
        fetcNotes()
    });

    const handleNew = () => {
        setAddNewNote(!addNewNote);
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

    let results: any = [];
    notes.forEach((n) => {
        results.push(<NoteCard title={n.title} description={n.description} />)
    })

    return (
        <div className={styles.container}>
            <div className={styles.seperator}>
                {!addNewNote || <AppButton text='Add New Note' variant='primary' onClick={handleNew} />}
                {addNewNote ||
                    <form method='post' onSubmit={handleSave}>
                        <AppInput name={'title'} text={'Title'} type={'text'} />
                        <AppInput name={'description'} text={'Add description'} type={'text'} />
                        <AppButton text='Save Note' variant='primary' type='submit' />
                    </form>
                }
            </div>

            <div className={styles.seperator}>
                {results}
            </div>
        </div>
    )
}
