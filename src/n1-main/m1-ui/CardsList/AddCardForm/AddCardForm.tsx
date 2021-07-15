import React, { Dispatch, SetStateAction } from 'react'
import mainStyles from '../../../App.module.scss'
import styles from './AddCardForm.module.scss'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { createNewPack, setLoadingPacks } from '../../../m2-bll/packsReducer'
import SuperInputText from '../../common/SuperInput/SuperInputText'
import SuperButton from '../../common/SuperButton/SuperButton'
import { createNewCard } from '../../../m2-bll/cardsReducer'

type AddCardFormPropsType = {
  setActive: Dispatch<SetStateAction<boolean>>
}

type FormValues = {
  question: string,
  answer: string
}

export const AddCardForm = ({setActive}: AddCardFormPropsType) => {
  const dispatch = useDispatch()
  const formik = useFormik({
    validate: (card) => {
      if (!card.question) {
        return {
          question: 'question is required',
        }
      }
      if (!card.answer) {
        return {
          answer: 'answer is required',
        }
      }
    },
    
    initialValues: {
      question: '',
      answer: '',
    },
    onSubmit: async (card: FormValues) => {
      setActive(false)
      await dispatch(createNewCard(card.question, card.answer))
      card.question = ''
      card.answer = ''
    },
    // onReset: (values, {resetForm}) => resetForm(),
  })
  
  const handleCancel = () => {
    setActive(false)
    formik.resetForm()
  }
  
  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <div className={styles.formWrapper}>
        <h2 className={styles.title}>Add new card</h2>
        <div>
          <label htmlFor="question" className={styles.label}>Question</label>
          <SuperInputText
            name="question"
            type="text"
            className={styles.inputForm}
            onChange={formik.handleChange}
            value={formik.values.question}
          />
          {formik.touched.question}
        </div>
        <div className={styles.errorContainer}>
          {formik.errors.question ? (
            <div className={styles.error}>{formik.errors.question}</div>) : null}
        </div>
        <div>
          <label htmlFor="answer" className={styles.label}>Answer</label>
          <SuperInputText
            name="answer"
            type="text"
            className={styles.inputForm}
            onChange={formik.handleChange}
            value={formik.values.answer}
          />
        </div>
        <div className={styles.errorContainer}>
          {formik.errors.answer ? (
            <div className={styles.error}>{formik.errors.answer}</div>) : null}
        </div>
        <div className={styles.buttonContainer}>
          <SuperButton
            className={styles.cancelButton}
            onClick={handleCancel}
            title={'Cancel'}
            type={'reset'}
          >
            Cancel
          </SuperButton>
          <SuperButton
            className={styles.saveButton}
            title={'Save'}
            type={'submit'}
          >
            Save
          </SuperButton>
        </div>
      </div>
    </form>
  )
}
