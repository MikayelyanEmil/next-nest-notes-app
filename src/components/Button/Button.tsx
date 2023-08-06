import React from 'react'
import styles from './Button.module.css'

interface IButton {
  text: string,
  variant: 'primary' | 'secondary',
  onClick?: any,
  type?: 'submit',
  color?: string
}


export const Button: React.FC<IButton> = ({ text, variant, onClick, type, color }) => {
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
