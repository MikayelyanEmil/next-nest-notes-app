import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { AppButton } from '../components/AppButton/AppButton'
import NoteCard from '@/components/NoteCard/NoteCard'

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.seperator}>
        <AppButton text="Add New Note" variant='primary' />
      </div>

      <div className={styles.seperator}>
      <NoteCard></NoteCard>
      <NoteCard></NoteCard>
      <NoteCard></NoteCard>
      </div>
    </div>
  )
}
