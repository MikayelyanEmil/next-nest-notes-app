import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { AppButton } from '../components/Button/Button'
import NoteCard from '@/components/NoteCard/NoteCard'
import { AppInput } from '@/components/Input/Input'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ok } from 'assert'

export default function Home() {

    useEffect(() => {
        const fetcNotes = async () => {
            const response = await fetch(`http://localhost:3001/notes`, {
                method: 'Get',
            });
            if (!response.ok) {
                console.log(23334445);
                return;
            }
            const data = await response.json()
            setNotes(data);
            console.log(data);
        }
    });

    const [notes, setNotes] = useState('');
    const [addNewNote, setAddNewNote] = useState(true);

    const handleNew = () => {
        setAddNewNote(!addNewNote);
        // setBtnText('')
    }

    const handleSave = async (event: any) => {
        event.preventDefault();
        const body = { title: event.target.title.value, description: event.target.description.value }

        const data = await fetch(`http://localhost:3001/notes/create`, {
            method: 'Post',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
            mode: 'cors'
        });
        await data.json();


    }


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

                {/* {test} */}
            </div>

            <div className={styles.seperator}>
                <NoteCard></NoteCard>
                <NoteCard></NoteCard>
                <NoteCard></NoteCard>
            </div>
        </div>
    )
}
