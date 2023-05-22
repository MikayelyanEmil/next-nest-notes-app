import React from 'react'
import styles from './AppButton.module.css'

interface IAppButton {
  text: string,
  variant: 'primary' | 'secondary'
}


export const AppButton: React.FC<IAppButton> = ({ text, variant }) => {
  return (
    <button className={variant === 'primary' ? styles.appButtonPrimary : styles.appButtonSecondary}>
      {text}
    </button>
  )
}
