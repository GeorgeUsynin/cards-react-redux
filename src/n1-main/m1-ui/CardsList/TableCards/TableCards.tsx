import React from "react";
import cls from "./TableCards.module.scss"
import {TableHeaderCards} from "./TableHeaderCards/TableHeaderCards";
import {TableDataCards} from "./TableDataCards/TableDataCards";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/store";
import {CardResponseType} from "../../../m3-dal/apiCards";

type TableCardsPropsType = {}

export const TableCards: React.FC<TableCardsPropsType> = () => {

    const cardsData = useSelector<AppRootStateType, Array<CardResponseType>>(state => state.cards.cards)

    return (
        <div className={cls.tableContainer}>
            <TableHeaderCards className={cls.tableHeader}/>
            {
                cardsData.map(card => {

                    const updatedDate = card.updated.slice(0, 10)
                    const updatedTime = card.updated.slice(11, 19)

                    return (
                        <TableDataCards
                            question={card.question}
                            answer={card.answer}
                            updatedDate={updatedDate}
                            updatedTime={updatedTime}
                            grade={card.grade}/>
                    )
                })
            }
        </div>
    )
}