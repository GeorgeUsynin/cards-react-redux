import React, { Dispatch, SetStateAction } from 'react'
import styles from './AddPackForm.module.scss'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { createNewPack } from '../../../m2-bll/packsReducer'
import SuperInputText from '../../common/SuperInput/SuperInputText'
import SuperButton from '../../common/SuperButton/SuperButton'

type FormPropsType = {
  active: boolean
  setActive: Dispatch<SetStateAction<boolean>>
}

type FormValues = {
  packName: string
}

export const AddPackForm = ({setActive}: FormPropsType) => {
  const dispatch = useDispatch()
  const formik = useFormik({
    validate: (packName) => {
      
      if (!packName.packName) {
        return {
          packName: 'Pack is required',
        }
      }
    },
    initialValues: {
      packName: '',
    },
    onSubmit: async (values: FormValues) => {
      setActive(false)
      await dispatch(createNewPack(values.packName))
      values.packName = ''
    },
  })
  
  const handleCancel = () => {
    setActive(false)
    formik.resetForm()
  }
  
  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <div className={styles.formWrapper}>
        <h2 className={styles.title}>Add new pack</h2>
        <div>
          <label htmlFor="packName" className={styles.label}>Name pack</label>
          <SuperInputText
            name="packName"
            type="packName"
            className={styles.inputForm}
            onChange={formik.handleChange}
            value={formik.values.packName}
          />
        </div>
        <div className={styles.errorContainer}>
          {formik.errors.packName ? (
            <div className={styles.error}>{formik.errors.packName}</div>) : null}
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
