import React from 'react'
import styles from './Button.module.css'

interface IAppButton {
  text: string,
  variant: 'primary' | 'secondary',
  onClick?: () => void,
  type?: 'submit',
  color?: string
}


export const AppButton: React.FC<IAppButton> = ({ text, variant, onClick, type, color }) => {
  return (
    <button 
      onClick={onClick} 
      className={variant === 'primary' ? styles.appButtonPrimary : styles.appButtonSecondary}
      style={variant === 'primary' ? {backgroundColor: color} : {color: color, borderColor: color}}  
    >
      {text}
    </button>
  )
}
