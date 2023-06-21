import React from 'react'
import styles from './NoteCard.module.css'

interface INoteCard {
  title: string,
  description: string
}

export const NoteCard: React.FC<INoteCard> = ({title, description}) => {
  return (
    <div className={styles.notecard}>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
    </div>
  )
}
