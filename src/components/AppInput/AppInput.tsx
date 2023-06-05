import React from 'react'
import styles from './AppInput.module.css'

interface IAppInput {
    text: string,
    type: string,
    name: string
}

export const AppInput: React.FC<IAppInput> = ({ text, type, name }) => {
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
