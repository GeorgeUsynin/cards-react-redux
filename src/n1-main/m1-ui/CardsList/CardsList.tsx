import React, { KeyboardEvent, useCallback, useEffect, useState } from 'react'
import cls from './CardsList.module.scss'
import Search from '../common/Search/Search'
import SuperButton from '../common/SuperButton/SuperButton'
import { useHistory, useParams } from 'react-router-dom'
import {
  deleteCard,
  editCard,
  getDataCards,
  setCurrentPage,
  setPackId,
  setPageCount,
  setSearchName,
} from '../../m2-bll/cardsReducer'
import { useDispatch, useSelector } from 'react-redux'
import { TableCards } from './TableCards/TableCards'
import { PATH } from '../../App'
import { AppRootStateType } from '../../m2-bll/store'
import Paginator from '../common/Paginator/Paginator'
import arrow from '../../../assets/images/LeftArrow.svg'
import Modal from '../common/Modal/Modal'
import { AddCardForm } from './AddCardForm/AddCardForm'

export const CardsList = () => {
  debugger
  const dispatch = useDispatch()
  const history = useHistory()
  
  const page = useSelector<AppRootStateType, number>(state => state.cards.cardsRequestParameters.page)
  const packName = useSelector<AppRootStateType, string>(state => state.cards.cardPackName)
  const pageCount = useSelector<AppRootStateType, number>(state => state.cards.cardsRequestParameters.pageCount)
  const cardsTotalCount = useSelector<AppRootStateType, number>(state => state.cards.cardsTotalCount)
  const searchQuestion = useSelector<AppRootStateType, string>(state => state.cards.cardsRequestParameters.cardQuestion)
  const appUserId = useSelector<AppRootStateType, string>(state => state.profile.informationAboutUser._id)
  const currentPackUserId = useSelector<AppRootStateType, string>(state => state.cards.currentPackUserId)
  
  const {packId} = useParams<{ packId: string }>()
  
  const [activeModal, setActiveModal] = useState<boolean>(false)
  
  useEffect(() => {
    dispatch(setPackId(packId))
    dispatch(getDataCards())
  }, [page, pageCount, searchQuestion])
  
  const onCardsPageChanges = useCallback((page: number) => {
    dispatch(setCurrentPage(page + 1))
  }, [dispatch])
  
  const changeCardsPageCount = useCallback((count: number) => {
    dispatch(setPageCount(count))
  }, [dispatch])
  
  const handlePressSearch = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    dispatch(setSearchName(e.currentTarget.value))
    e.currentTarget.blur()
  }, [dispatch])
  
  const openModal = () => {
    setActiveModal(true)
  }
  
  const editCardHandler = useCallback((cardId: string) => {
    const newCardQuestion = prompt('Enter the question of the card: ')
    const newCardAnswer = prompt('Enter the answer of the card: ')
    if (newCardQuestion && newCardAnswer)
      dispatch(editCard(cardId, newCardQuestion, newCardAnswer))
  }, [dispatch])
  
  const removeCard = useCallback((cardId: string) => {
    dispatch(deleteCard(cardId))
  }, [dispatch])
  
  return (
    <div className={cls.cardslistContainer}>
      <div className={cls.card}>
        <div className={cls.cardslist}>
          <div className={cls.arrowTitleContainer}>
            <img className={cls.arrow}
                 onClick={() => {
                   history.push(PATH.PACKS_LIST)
                 }}
                 src={arrow}
                 alt={''}
            />
            <h2 className={cls.cardslistTitle}>
              <span>{packName}</span>
            </h2>
          </div>
          <div className={cls.search_AddButtonContainer}>
            <Search className={cls.search} handlePressSearch={handlePressSearch}/>
            <div className={cls.addButtonContainer}>
              <Modal active={activeModal} setActive={setActiveModal}>
                <AddCardForm setActive={setActiveModal}/>
              </Modal>
              {appUserId === currentPackUserId
              && <SuperButton
                className={cls.addPackButton}
                onClick={openModal}
              >
                <span>Add new card</span>
              </SuperButton>}
            </div>
          </div>
          <TableCards />
          {
            !!cardsTotalCount &&
            <Paginator
              pageCount={pageCount}
              itemsTotalCount={cardsTotalCount}
              onPageChanges={onCardsPageChanges}
              changePageCount={changeCardsPageCount}
            />
          }
        </div>
      </div>
    </div>
  )
}