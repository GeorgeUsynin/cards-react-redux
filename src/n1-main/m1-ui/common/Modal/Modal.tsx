import React from 'react'
import styles from './Modal.module.scss'

export const Modal = ({title, children}: any) => {
  debugger
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalBlack}></div>
      <div className={styles.modalContent}>{children}</div>
    </div>
  )
}