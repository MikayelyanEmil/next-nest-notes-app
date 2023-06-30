import React from 'react'
import styles from './NoteCard.module.css'
import { Button } from '../Button/Button'
import Image from 'next/image'
import redDeleteIcon from '../../icons/delete-svgrepo-com.svg'
import editIcon from '../../icons/edit-svgrepo-com.svg'

interface INoteCard {
  title: string,
  description: string,
  id: string,
  show?: () => void,
  setId?: () => void
}

export const NoteCard: React.FC<INoteCard> = ({ title, description, id, show, setId }) => {
  const handleEdit = async (id) => {
    await show(false);
    await setId(id);
    document.getElementById('title').value = title;
    document.getElementById('description').value = description;
  }

  const handleDelete = async (id) => {
    const access_token = document.cookie.split(';').filter((c) => c.includes('access_token'))[0].split('=')[1];

    const data = await fetch(`http://localhost:3001/notes/delete`, {
      method: 'Post',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "bearer " + access_token
      },
      body: JSON.stringify({id}),
      mode: 'cors'
    });
    await data.json();
  }

  return (
    <div className={styles.notecard} key={id}>
      <div className={styles.top}>
        <span className={styles.title}>{title}</span>
        <button className={styles.editBtn} onClick={() => handleEdit(id)}><Image src={editIcon} height={18} width={18} alt='Edit'/></button>
        <button className={styles.deleteBtn} onClick={() => handleDelete(id)}> <Image src={redDeleteIcon} height={18} width={18} alt='Delete' /></button>
      </div>
      <div className={styles.description}>{description}</div>
    </div>
  )
}
