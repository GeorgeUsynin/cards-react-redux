import React from "react";
import cls from "./TableData.module.scss"
import {CardPackType} from "../../../../m2-bll/packsReducer";


export const TableData: React.FC<CardPackType> = ({
    name, _id,cardsCount,created,updated,user_id,children
                                                  }) => {

    return (
        <div className={cls.tableData}>
            <div>{name}</div>
            <div>{cardsCount}</div>
            <div>{updated}</div>
            <div>{created}</div>
            <div>Actions</div>
        </div>
    )
}