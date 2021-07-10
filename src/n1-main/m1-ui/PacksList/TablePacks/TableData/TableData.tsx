import React from "react";
import cls from "./TableData.module.scss"
import SuperButton from "../../../common/SuperButton/SuperButton";

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
}


export const TableData: React.FC<TableDataPropsType> = ({
                                                            name,
                                                            _id,
                                                            cardsCount,
                                                            updatedDate,
                                                            updatedTime,
                                                            removePack,
                                                            appUserId,
                                                            user_id,
                                                            createdBy,
                                                            children
                                                        }) => {

    return (
        <div className={cls.tableData}>
            <div className={cls.red}>{name}</div>
            <div>{cardsCount}</div>
            <div>
                <p>Date: {updatedDate}</p>
                <p>Time: {updatedTime}</p>
            </div>
            <div>
                <p>{createdBy}</p>
            </div>
            <div className={cls.buttonsContainer}>
                <SuperButton className={cls.deleteButton}
                             onClick={() => removePack(_id)}
                             disabled={user_id !== appUserId}
                ><span>Delete</span></SuperButton>
            </div>
        </div>
    )
}