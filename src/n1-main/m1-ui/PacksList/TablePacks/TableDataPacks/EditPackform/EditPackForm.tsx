import { useFormik } from 'formik'
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletePack, editPack } from '../../../../../m2-bll/packsReducer'
import { AppRootStateType } from '../../../../../m2-bll/store'
import SuperButton from '../../../../common/SuperButton/SuperButton'
import SuperInputText from '../../../../common/SuperInput/SuperInputText'
import styles from './EditPackForm.module.scss'

type EditPackFormPropsType = {
  packId: string
  packName: string
  setActive: Dispatch<SetStateAction<boolean>>
}

type FormValues = {
  packName: string
}

export const EditPackForm = ({packName, packId, setActive}: EditPackFormPropsType) => {
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
      packName: packName,
    },
    onSubmit: async (packName: FormValues) => {
      setActive(false)
      await dispatch(editPack(packId, packName.packName))
      packName.packName = ''
    },
    onReset: (values, {resetForm}) => resetForm(),
  })
  
  const handleCancel = () => {
    setActive(false)
  }
  
  return (
    <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
      <h2>Edit Pack Name</h2>
      <div>
        <label htmlFor="packName" className={styles.label}>new pack name</label>
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
