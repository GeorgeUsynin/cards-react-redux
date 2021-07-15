import React, { Dispatch, SetStateAction } from 'react'
import { useDispatch } from 'react-redux'
import { deletePack } from '../../../../../m2-bll/packsReducer'
import SuperButton from '../../../../common/SuperButton/SuperButton'
import styles from './DeletePackForm.module.scss'

type DeletePackFormPropsType = {
  packId: string
  packName: string
  setActive: Dispatch<SetStateAction<boolean>>
}

export const DeletePackForm = ({packName, packId, setActive}: DeletePackFormPropsType) => {
  const dispatch = useDispatch()
  
  const handleDeletePack = () => {
    dispatch(deletePack(packId))
    setActive(false)
  }
  const handleCancel = () => {
    setActive(false)
  }
  
  return (
    <form className={styles.formContainer}>
      <h2>Delete Pack</h2>
      <div className={styles.question}>Do you really want to remove <b>Pack Name</b> - <b>{packName}</b>?
        <div>
          All cards will be excluded from this course
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <SuperButton
          onClick={handleCancel}
          className={styles.cancelButton}
        >
          Cancel
        </SuperButton>
        <SuperButton
          onClick={handleDeletePack}
          className={styles.deleteButton}
        >
          Delete
        </SuperButton>
      </div>
    </form>
  )
}