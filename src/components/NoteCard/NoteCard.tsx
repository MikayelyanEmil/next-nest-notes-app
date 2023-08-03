import React from 'react'
import styles from './NoteCard.module.css'
import { Button } from '../Button/Button'
import Image from 'next/image'
import redDeleteIcon from '../../icons/delete-svgrepo-com.svg'
import editIcon from '../../icons/edit-svgrepo-com.svg'
import api from '@/http'

interface INoteCard {
  title: string,
  description: string,
  id: string,
  show: any,
  setId: any,
  setIsAuthorized: any
}

export const NoteCard: React.FC<INoteCard> = ({ title, description, id, show, setId, setIsAuthorized }) => {
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

  const handleDelete = async (id: any) => {
    try {
      await api.post('notes/delete', { id })
    } catch (error: any) {
      if (error.response.status == 403) {

      } else {
        setIsAuthorized(false);
      }
    }
  }

  return (
    <div className={styles.notecard} key={id}>
      <div className={styles.top}>
        <span className={styles.title}>{title}</span>
        <button className={styles.editBtn} onClick={() => handleEdit(id)}><Image src={editIcon} height={18} width={18} alt='Edit' /></button>
        <button className={styles.deleteBtn} onClick={() => handleDelete(id)}> <Image src={redDeleteIcon} height={18} width={18} alt='Delete' /></button>
      </div>
      <div className={styles.description}>{description}</div>
    </div>
  )
}
