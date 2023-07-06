import React from "react";
import styles from './Error.module.css';
import Image from "next/image";
import closeIcon from "@/icons/close.svg";

export default function Error({ message, onClose }) {
  return (
    <div className={styles.errorPopup}>
      <div className={styles.errorContent}>
        <span className={styles.errorMessage}>{message}</span>
        {/* <button className={styles.closeButton} onClick={onClose}>
          <Image src={closeIcon} alt="close" />
        </button> */}
      </div>
    </div>
  );
};




