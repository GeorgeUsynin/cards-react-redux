import React from "react";
import cls from "./TableDataPacks.module.scss"
import SuperButton from "../../../common/SuperButton/SuperButton";
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setCardPackName, setSearchName} from "../../../../m2-bll/cardsReducer";
import {setPackName} from "../../../../m2-bll/learnReducer";

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
        dispatch(setSearchName(''))
        localStorage.setItem("packName", name)
    }

    const hidden = user_id !== appUserId ? cls.none : ""
    const justifyContent = user_id !== appUserId ? cls.flexEnd : cls.flexBetween

    return (
        <div className={cls.tableData}>
            <NavLink to={`/cardslist/${_id}`} onClick={onPackClickHandler} className={cls.name}>
                <div>{name}</div>
            </NavLink>
            <div>{cardsCount}</div>
            <div>
                <p>Date: {updatedDate}</p>
                <p>Time: {updatedTime}</p>
            </div>
            <div>{createdBy}</div>
            <div className={`${cls.buttonsContainer} ${justifyContent}` }>
                <SuperButton className={`${cls.deleteButton} ${hidden}`}
                             onClick={() => removePack(_id)}
                             disabled={user_id !== appUserId}
                ><span>Delete</span></SuperButton>
                <SuperButton className={`${cls.editLearnButton} ${hidden}`}
                             onClick={() => editPackHandler(_id)}
                ><span>Edit</span></SuperButton>

                <SuperButton className={cls.editLearnButton}
                             onClick={() => dispatch(setPackName(name))}
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