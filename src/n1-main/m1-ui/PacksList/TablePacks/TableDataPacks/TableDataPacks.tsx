import React, {useState} from 'react'
import cls from './TableDataPacks.module.scss'
import SuperButton from '../../../common/SuperButton/SuperButton'
import {NavLink} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {setCardPackName, setCurrentPackId, setSearchName} from '../../../../m2-bll/cardsReducer'
import Modal from '../../../common/Modal/Modal'
import {DeletePackForm} from './DeletePackForm/DeletePackForm'
import {EditPackForm} from './EditPackform/EditPackForm'
import {setIsFetching} from "../../../../m2-bll/learnReducer";

type TableDataPropsType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    updatedDate: string
    updatedTime: string
    appUserId: string
    createdBy: string
}


export const TableDataPacks: React.FC<TableDataPropsType> = ({
                                                                 name,
                                                                 _id,
                                                                 cardsCount,
                                                                 updatedDate,
                                                                 updatedTime,

                                                                 appUserId,
                                                                 user_id,
                                                                 createdBy,

                                                                 children
                                                             }) => {

    const [activeDeleteModal, setActiveDeleteModal] = useState<boolean>(false)
    const [activeEditModal, setActiveEditModal] = useState<boolean>(false)

    const dispatch = useDispatch()

    const openDeleteModal = () => {
        setActiveDeleteModal(true)
    }
    const openEditModal = () => {
        setActiveEditModal(true)
    }
    const onClickLearnButtonHandler = () => {
        localStorage.setItem("packName", name)
        dispatch(setIsFetching(true))
    }

    const onPackClickHandler = () => {
        dispatch(setCardPackName(name))
        dispatch(setCurrentPackId(user_id))
        dispatch(setSearchName(''))
    }

    return (
        <div className={cls.tableData}>
            <div className={cls.name}>
                <NavLink to={`/cardslist/${_id}`}
                         onClick={onPackClickHandler}
                className={cls.name}
                >
                    {name}
                </NavLink>
            </div>
            <div>{cardsCount}</div>
            <div>
                <p>Date: {updatedDate}</p>
                <p>Time: {updatedTime}</p>
            </div>
            <div>{createdBy}</div>
            <Modal active={activeDeleteModal} setActive={setActiveDeleteModal}>
                <DeletePackForm packName={name} packId={_id} setActive={setActiveDeleteModal}/>
            </Modal>
            <div className={cls.buttonsContainer}>
                <SuperButton
                    className={cls.deleteButton}
                    onClick={openDeleteModal}
                    disabled={user_id !== appUserId}
                >
                    <span>Delete</span>
                </SuperButton>
                <Modal active={activeEditModal} setActive={setActiveEditModal}>
                    <EditPackForm packName={name} packId={_id} setActive={setActiveEditModal}/>
                </Modal>
                <SuperButton
                    className={cls.editLearnButton}
                    onClick={openEditModal}
                    disabled={user_id !== appUserId}
                >
                    <span>Edit</span>
                </SuperButton>
                <SuperButton className={cls.editLearnButton}
                             onClick={onClickLearnButtonHandler}
                             disabled={cardsCount === 0}
                >
                    {
                        cardsCount === 0
                            ?
                            <span>Learn</span>
                            :
                            <NavLink to={`/learn/${_id}`}>Learn</NavLink>
                    }

                </SuperButton>
            </div>
        </div>
    )
}