import React from 'react'
import styles from './NoteCard.module.css'
import Image from 'next/image'
import redDeleteIcon from '../../icons/delete-svgrepo-com.svg'
import editIcon from '../../icons/edit-svgrepo-com.svg'
import { handleDelete } from '@/handlers/deleteNote'

interface INoteCard {
  title: string,
  description: string,
  id: string,
  show: any,
  setId: any,
  setIsAuthorized: any,
  lever: boolean,
  runFetch: any
}

export const NoteCard: React.FC<INoteCard> = ({ title, description, id, show, setId, setIsAuthorized, lever, runFetch }) => {
  const handleEdit = async (id: any) => {
    // try this  
    await show(true);
    // without await.
    await setId(id);
    const titleElement = document.getElementById('title') as HTMLTextAreaElement;
    const descriptionElement = document.getElementById('description') as HTMLTextAreaElement;
    titleElement.value = title;
    descriptionElement.value = description;
  }

  return (
    <div className={styles.notecard} key={id}>
      <div className={styles.top}>
        <span className={styles.title}>{title}</span>
        <button className={styles.editBtn} onClick={() => handleEdit(id)}><Image src={editIcon} height={18} width={18} alt='Edit' /></button>
        <button className={styles.deleteBtn} onClick={() => handleDelete(id, setIsAuthorized, lever, runFetch)}> <Image src={redDeleteIcon} height={18} width={18} alt='Delete' /></button>
      </div>
      <div className={styles.description}>{description}</div>
    </div>
  )
}
