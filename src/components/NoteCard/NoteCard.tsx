import React from 'react'
import styles from './NoteCard.module.css'

export default function NoteCard() {
  return (
    <div className={styles.notecard}>
      <div className={styles.title}>Example</div>
      <div className={styles.description}></div>
    
      {/* <div className={styles.title}>Example</div>
      <div className={styles.description}>
        <textarea className={styles.textarea} name="" id=""></textarea>
      </div> */}
    </div>
  )
}
