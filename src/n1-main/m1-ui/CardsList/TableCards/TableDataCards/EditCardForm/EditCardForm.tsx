import { useFormik } from 'formik'
import React, { Dispatch, SetStateAction } from 'react'
import { useDispatch } from 'react-redux'
import { editCard } from '../../../../../m2-bll/cardsReducer'
import SuperButton from '../../../../common/SuperButton/SuperButton'
import SuperInputText from '../../../../common/SuperInput/SuperInputText'
import styles from './EditCardForm.module.scss'

type EditCardFormPropsType = {
  cardId: string
  question: string
  setActive: Dispatch<SetStateAction<boolean>>
}

type FormValues = {
  question: string
  answer: string
}

export const EditCardForm = ({question, cardId, setActive}: EditCardFormPropsType) => {
  const dispatch = useDispatch()
  const formik = useFormik({
    validate: (values) => {
      
      if (!values.question) {
        return {
          question: 'Question is required',
        }
      }
      if (!values.answer) {
        return {
          answer: 'Answer is required',
        }
      }
    },
    initialValues: {
      question: question,
      answer: '',
    },
    onSubmit: async ({question, answer}: FormValues) => {
      setActive(false)
      await dispatch(editCard(cardId, question, answer))
      question = ''
      answer = ''
    },
  })
  
  const handleCancel = () => {
    setActive(false)
    formik.resetForm()
  }
  
  return (
    <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
      <h2>Edit Card</h2>
      <div>
        <label htmlFor="question" className={styles.label}>new question</label>
        <SuperInputText
          name="question"
          type="text"
          className={styles.inputForm}
          onChange={formik.handleChange}
          value={formik.values.question}
        />
      </div>
      <div className={styles.errorContainer}>
        {formik.errors.question ? (
          <div className={styles.error}>{formik.errors.question}</div>) : null}
      </div>
      
      <div>
        <label htmlFor="answer" className={styles.label}>new answer</label>
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
      
      <div className={styles.buttonWrapper}>
        <SuperButton
          onClick={handleCancel}
          className={styles.cancelButton}
          type={'reset'}
        >
          Cancel
        </SuperButton>
        <SuperButton
          className={styles.updateButton}
          type={'submit'}
        >
          Update
        </SuperButton>
      </div>
    </form>
  )
}
