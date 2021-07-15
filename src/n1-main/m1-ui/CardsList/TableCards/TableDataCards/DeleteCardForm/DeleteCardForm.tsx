import React, { Dispatch, SetStateAction } from 'react'
import { useDispatch } from 'react-redux'
import { deleteCard } from '../../../../../m2-bll/cardsReducer'
import SuperButton from '../../../../common/SuperButton/SuperButton'
import styles from './DeleteCardForm.module.scss'

type DeleteCardFormPropsType = {
  cardId: string
  question: string
  setActive: Dispatch<SetStateAction<boolean>>
}

export const DeleteCardForm = ({question, cardId, setActive}: DeleteCardFormPropsType) => {
  const dispatch = useDispatch()
  
  const handleDeletePack = () => {
    dispatch(deleteCard(cardId))
    setActive(false)
  }
  const handleCancel = () => {
    setActive(false)
  }
  
  return (
    <form className={styles.formContainer}>
      <h2>Delete Card</h2>
      <div className={styles.question}>Do you really want to remove <b>Card </b> - <b>{question}</b>?
        <div>
          This question will be excluded from this pack
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