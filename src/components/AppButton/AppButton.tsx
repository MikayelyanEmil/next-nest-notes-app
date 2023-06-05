import React from 'react'
import styles from './AppButton.module.css'

interface IAppButton {
  text: string,
  variant: 'primary' | 'secondary',
  onClick?: () => void,
  type?: 'submit'
}


export const AppButton: React.FC<IAppButton> = ({ text, variant, onClick, type }) => {
  return (
    <button onClick={onClick} className={variant === 'primary' ? styles.appButtonPrimary : styles.appButtonSecondary}>
      {text}
    </button>
  )
}
