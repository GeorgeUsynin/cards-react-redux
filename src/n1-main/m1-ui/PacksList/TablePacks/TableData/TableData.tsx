import React from "react";
import cls from "./TableData.module.scss"

type TableDataPropsType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: string
    updatedDate: string
    updatedTime: string
    createdDate: string
    createdTime: string
    classNameFromTablePacks: string
}


export const TableData: React.FC<TableDataPropsType> = ({
                                                            name,
                                                            _id,
                                                            cardsCount,
                                                            updatedDate,
                                                            updatedTime,
                                                            createdDate,
                                                            createdTime,
                                                            classNameFromTablePacks,
                                                            user_id,
                                                            children
                                                        }) => {

    return (
        <div className={`${cls.tableData} ${classNameFromTablePacks}`}>
            <div>{name}</div>
            <div>{cardsCount}</div>
            <div>
                <p>Date: {updatedDate}</p>
                <p>Time: {updatedTime}</p>
            </div>
            <div>
                <p>Date: {createdDate}</p>
                <p>Time: {createdTime}</p>
            </div>
            <div>Actions</div>
        </div>
    )
}