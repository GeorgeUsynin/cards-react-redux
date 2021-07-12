import React from "react";
import cls from "./TableDataPacks.module.scss"
import SuperButton from "../../../common/SuperButton/SuperButton";
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setCardPackName, setCurrentPackUserId, setSearchName} from "../../../../m2-bll/cardsReducer";

type TableDataPropsType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    updatedDate: string
    updatedTime: string
    removePack: (packId: string) => void
    appUserId: string
    createdBy: string
    editPackHandler: (packId: string) => void
}


export const TableDataPacks: React.FC<TableDataPropsType> = ({
                                                                 name,
                                                                 _id,
                                                                 cardsCount,
                                                                 updatedDate,
                                                                 updatedTime,
                                                                 removePack,
                                                                 appUserId,
                                                                 user_id,
                                                                 createdBy,
                                                                 editPackHandler,
                                                                 children
                                                             }) => {

    const dispatch = useDispatch()

    const onPackClickHandler = () => {
        dispatch(setCardPackName(name))
        dispatch(setCurrentPackUserId(user_id))
        dispatch(setSearchName(''))
    }

    return (
        <div className={cls.tableData}>
            <NavLink to={`/cardslist/${_id}`} onClick={onPackClickHandler}>
                <div>{name}</div>
            </NavLink>
            <div>{cardsCount}</div>
            <div>
                <p>Date: {updatedDate}</p>
                <p>Time: {updatedTime}</p>
            </div>
            <div>{createdBy}</div>
            <div className={cls.buttonsContainer}>
                <SuperButton className={cls.deleteButton}
                             onClick={() => removePack(_id)}
                             disabled={user_id !== appUserId}
                ><span>Delete</span></SuperButton>
                <SuperButton className={cls.editButton}
                             onClick={() => editPackHandler(_id)}
                             disabled={user_id !== appUserId}
                ><span>Edit</span></SuperButton>
            </div>
        </div>
    )
}