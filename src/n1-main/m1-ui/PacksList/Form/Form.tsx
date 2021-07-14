import React, { Dispatch, SetStateAction } from 'react'
import mainStyles from '../../../App.module.scss'
import styles from './Form.module.scss'
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

export const Form = ({setActive}: FormPropsType) => {
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
    onSubmit: async (packName: FormValues) => {
      await dispatch(createNewPack(packName.packName))
      packName.packName = ''
      setActive(false)
    },
    onReset: (values, {resetForm}) => resetForm(),
  })
  
  const handleCancel = (e: any) => {
    setActive(false)
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
          {/*{formik.touched.packName}*/}
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
            className={styles.registerButton}
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