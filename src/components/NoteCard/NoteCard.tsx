import React from 'react'
import styles from './NoteCard.module.css'
import { Button } from '../Button/Button'

interface INoteCard {
  title: string,
  description: string,
  id: string,
  show?: () => void
}

export const NoteCard: React.FC<INoteCard> = ({ title, description, id, show }) => {
  const handleEdit = async (event) => {
    show(false);
    document.getElementById('title').value = title;
    document.getElementById('description').value = description;
  }

  return (
    <div className={styles.notecard} key={id}>
      <div className={styles.top}>
        <span className={styles.title}>{title}</span>
        <button className={styles.saveBtn} onClick={handleEdit}>Edit</button>
      </div>
      <div className={styles.description}>{description}</div>
    </div>
    // <div className={styles.notecard}>
    //   <div className={styles.title}>
    //     <textarea className={styles.textareaTitle} name="" id="" placeholder='Set Title'>{title}</textarea> <button onClick={handleSave} className={styles.saveBtn}>Save</button>
    //     </div>
    //   <div className={styles.description}><textarea className={styles.textarea} name="" id="" placeholder='Your Description'>{description}</textarea></div>
    // </div>
  )
}
