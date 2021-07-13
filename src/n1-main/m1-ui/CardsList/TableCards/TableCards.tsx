import React from "react";
import cls from "./TableCards.module.scss"
import {TableHeaderCards} from "./TableHeaderCards/TableHeaderCards";
import {TableDataCards} from "./TableDataCards/TableDataCards";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/store";
import {CardResponseType} from "../../../m3-dal/apiCards";
import {Preloader} from "../../common/preloader/Preloader";

type TableCardsPropsType = {
    removeCard: (cardId: string) => void
    editCardHandler: (cardId: string) => void
}

export const TableCards: React.FC<TableCardsPropsType> = ({removeCard, editCardHandler}) => {

    const cardsData = useSelector<AppRootStateType, Array<CardResponseType>>(state => state.cards.cards)
    const cardsTotalCount = useSelector<AppRootStateType, number>(state => state.cards.cardsTotalCount)
    const isFetchingCards = useSelector<AppRootStateType, boolean>(state => state.cards.isFetching)

    return (
        <div className={cls.tableContainer}>
            <TableHeaderCards className={cls.tableHeader}/>
            {
                isFetchingCards
                    ?
                    <Preloader/>
                    :
                    cardsTotalCount !== 0
                        ?
                        cardsData.map(card => {

                            const updatedDate = card.updated.slice(0, 10)
                            const updatedTime = card.updated.slice(11, 19)

                            return (

                                <TableDataCards
                                    key={card._id}
                                    card_id={card._id}
                                    question={card.question}
                                    answer={card.answer}
                                    updatedDate={updatedDate}
                                    updatedTime={updatedTime}
                                    grade={card.grade}
                                    removeCard={removeCard}
                                    editCardHandler={editCardHandler}
                                />
                            )
                        })
                        :
                        <p className={cls.noCardsTitle}>This pack is empty. Click add new card to fill this pack</p>
            }
        </div>
    )
}