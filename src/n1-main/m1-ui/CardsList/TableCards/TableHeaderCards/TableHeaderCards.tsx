import React from "react";
import cls from "./TableHeaderCards.module.scss"
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../../m2-bll/store";


type TableHeaderType = {
    className: string
}

export const TableHeaderCards: React.FC<TableHeaderType> = ({className}) => {



    const appUserId = useSelector<AppRootStateType, string>(state => state.profile.informationAboutUser._id)
    const packUserId = useSelector<AppRootStateType, string>(state => state.cards.packUserId)

    const gridChangeClass = appUserId === packUserId ? cls.gridChangeClass : ""

    return (
        <div className={`${className} ${cls.tableHeader} ${gridChangeClass}`}>
            <div>Question</div>
            <div>Answer</div>
            <div>Last Updated</div>
            <div>Grade</div>
            {appUserId === packUserId && <div>Actions</div>}
        </div>
    )
}