import React, {useState} from 'react'
import cls from './TableDataCards.module.scss'
import SuperButton from '../../../common/SuperButton/SuperButton'
import {useSelector} from 'react-redux'
import {AppRootStateType} from '../../../../m2-bll/store'
import Modal from '../../../common/Modal/Modal'
import {EditCardForm} from './EditCardForm/EditCardForm'
import {DeleteCardForm} from './DeleteCardForm/DeleteCardForm'
import ReactStars from 'react-stars'

type TableDataCardsPropsType = {
    question: string
    answer: string
    updatedDate: string
    updatedTime: string
    grade: number
    card_id: string
}


export const TableDataCards: React.FC<TableDataCardsPropsType> = ({
                                                                      question,
                                                                      answer,
                                                                      updatedDate,
                                                                      updatedTime,
                                                                      grade,

                                                                      card_id,
                                                                      children
                                                                  }) => {
    const [activeDeleteModal, setActiveDeleteModal] = useState<boolean>(false)
    const [activeEditModal, setActiveEditModal] = useState<boolean>(false)

    const appUserId = useSelector<AppRootStateType, string>(state => state.profile.informationAboutUser._id)
    const currentPackUserId = useSelector<AppRootStateType, string>(state => state.cards.packUserId)

    const gridChangeClass = appUserId === currentPackUserId ? cls.gridChangeClass : ""

    const openDeleteModal = () => {
        setActiveDeleteModal(true)
    }
    const openEditModal = () => {
        setActiveEditModal(true)
    }

    return (
        <div className={`${cls.tableData} ${gridChangeClass}`}>
            <div>{question}</div>
            <div>{answer}</div>
            <div>
                <p>Date: {updatedDate}</p>
                <p>Time: {updatedTime}</p>
            </div>
            <div>
                <ReactStars
                    count={5}
                    size={24}
                    value={grade}
                    edit={false}
                    color2={'#ffd700'}/>
            </div>

            {
                appUserId === currentPackUserId
                &&
                <div className={cls.buttonsContainer}>
                    <Modal active={activeDeleteModal} setActive={setActiveDeleteModal}>
                        <DeleteCardForm question={question} cardId={card_id} setActive={setActiveDeleteModal}/>
                    </Modal>
                    <SuperButton
                        onClick={openDeleteModal}
                        className={cls.deleteButton}
                    >
                        <span>Delete</span>
                    </SuperButton>
                    <Modal active={activeEditModal} setActive={setActiveEditModal}>
                        <EditCardForm question={question} cardId={card_id} setActive={setActiveEditModal}/>
                    </Modal>
                    <SuperButton
                        onClick={openEditModal}
                        className={cls.editButton}
                    >
                        <span>Edit</span>
                    </SuperButton>
                </div>
            }
        </div>
    )
}