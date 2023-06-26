import React from 'react'
import styles from './Input.module.css'

interface IInput {
    text: string,
    type: string,
    name: string,
    color?: string
}

export const Input: React.FC<IInput> = ({ text, type, name, color }) => {
    return (
        <>
            <div className={styles.wrapper}>
                <label htmlFor={text}>{text}</label>
            </div>
            <div className={styles.wrapper}>
                <input className={styles.input} type={type} name={name} />
            </div>
        </>
    )
}
