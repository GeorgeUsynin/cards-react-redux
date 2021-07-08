import React, { useEffect } from 'react'
import cls from './PacksList.module.scss'
import SuperButton from '../common/SuperButton/SuperButton'
import SuperInputText from '../common/SuperInput/SuperInputText'
import { TablePacks } from './TablePacks/TablePacks'
import Search from '../common/Search/Search'

import { useDispatch, useSelector } from 'react-redux'
import { getPackList } from '../../m2-bll/packsReducer'
import Paginator from '../common/Paginator/Paginator'
import { AppRootStateType } from '../../m2-bll/store'
import SuperDoubleRange from '../common/SuperDoubleRange/SuperDoubleRange'
import { DoubleRange } from './DoubleRange/DoubleRange'


export const PacksList = () => {
  const dispatch = useDispatch()
  const currentPage = useSelector<AppRootStateType, number>(state => state.packs.page)
  const pageCount = useSelector<AppRootStateType, number>(state => state.packs.pageCount)
  const packName = useSelector<AppRootStateType, string>(state => state.packs.packName)
  const minCardsCount = useSelector<AppRootStateType, number>(state => state.packs.minCardsCount)
  const maxCardsCount = useSelector<AppRootStateType, number>(state => state.packs.maxCardsCount)
  
  useEffect(() => {
    dispatch(getPackList())
  }, [currentPage, pageCount, packName, minCardsCount, maxCardsCount])
  
  
  return (
    <div className={cls.packlistContainer}>
      <div className={cls.card}>
        <div className={cls.info}>
          <p className={cls.ownerTitle}>Show packs cards</p>
          <div className={cls.buttonsContainer}>
            <SuperButton className={cls.myButton}>My</SuperButton>
            <SuperButton className={cls.allButton}>All</SuperButton>
          </div>
          <DoubleRange/>
        </div>
        <div className={cls.packslist}>
          <h2 className={cls.packslistTitle}>Packs list</h2>
          <div className={cls.search_AddButtonContainer}>
            {/*----------------*/}
            <Search className={cls.search}/>
            {/*search component will be HERE*/}
            <div className={cls.addButtonContainer}>
              <SuperButton className={cls.addPackButton}><span>Add new pack</span></SuperButton>
            </div>
          </div>
          <TablePacks/>
          <Paginator pageCount={pageCount}/>
        </div>
      </div>
    </div>
  )
}