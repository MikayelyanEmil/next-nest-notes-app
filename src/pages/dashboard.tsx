import Head from 'next/head'
import styles from '@/styles/Dashboard.module.css'
import { AppButton } from '../components/AppButton/AppButton'
import NoteCard from '@/components/NoteCard/NoteCard'
import { AppInput } from '@/components/AppInput/AppInput'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Dashboard() {

  const [addNewNote, setAddNewNote] = useState(true);
  const [test, setTest] = useState('empty');

  const handleNew = () => {
    setAddNewNote(!addNewNote);
    // setBtnText('')
  }

  const handleSave = async (event: any) => {
    event.preventDefault();
    const body = { email: event.target.email.value, password: event.target.password.value }

    const data = await fetch(`http://localhost:3001/users/signup`, {
      method: 'Post',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      mode: 'cors'
    });
    const { access_token } = await data.json();
    setTest(access_token);
  }


  return (
    <div className={styles.container}>
      <div className={styles.seperator}>
        {!addNewNote || <AppButton text='Add New Note' variant='primary' onClick={handleNew} />}
        {addNewNote ||
          <form method='post' onSubmit={handleSave}>
            <AppInput name={'email'} text={'Title'} type={'email'}/>
            <AppInput name={'password'} text={'Add description'} type={'password'} />
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
