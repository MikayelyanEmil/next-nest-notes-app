import React from "react";
import styles from './Error.module.css';
import Image from "next/image";
import closeIcon from "@/icons/close.svg";

interface IError {
  message: string,
  onClose: any
}

const Error: React.FC<IError> = ({message, onClose}) => {
  return (
    <div className={styles.errorPopup}>
      <div className={styles.errorContent}>
        <span className={styles.errorMessage}>{message}</span>
      </div>
    </div>
  );
}

export default Error;





