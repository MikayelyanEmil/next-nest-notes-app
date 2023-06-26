import React from 'react'
import styles from './NoteCard.module.css'
import { Button } from '../Button/Button'

interface INoteCard {
  title: string,
  description: string
}

export const NoteCard: React.FC<INoteCard> = ({ title, description }) => {
  return (
    // <div className={styles.notecard}>
    //   <div className={styles.title}>{title}</div>
    //   <div className={styles.description}>{description}</div>
    // </div>
    <div className={styles.notecard}>
      <div className={styles.title}>
        <textarea className={styles.textareaTitle} name="" id="" placeholder='Set Title'>{title}</textarea> 
        </div>
      <div className={styles.description}><textarea className={styles.textarea} name="" id="" placeholder='Your Description'>{description}</textarea></div>
    </div>
  )
}
