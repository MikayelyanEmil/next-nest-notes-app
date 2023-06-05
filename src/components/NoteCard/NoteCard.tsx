import React from 'react'
import styles from './NoteCard.module.css'

export default function NoteCard() {
  return (
    <div className={styles.notecard}>
      <div className={styles.title}>Example</div>
      <div className={styles.description}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque, animi veritatis aliquam, provident quos perferendis tempore ducimus repellat accusamus itaque inventore commodi, delectus voluptates nihil maiores? Fuga maiores qui officia.</div>
    </div>
  )
}
