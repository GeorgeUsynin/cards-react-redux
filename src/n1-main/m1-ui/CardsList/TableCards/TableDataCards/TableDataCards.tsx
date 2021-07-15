import React from "react";
import cls from "./TableDataCards.module.scss"
import SuperButton from "../../../common/SuperButton/SuperButton";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../../m2-bll/store";
import ReactStars from 'react-stars'

type TableDataCardsPropsType = {
    question: string
    answer: string
    updatedDate: string
    updatedTime: string
    grade: number
    removeCard: (cardId: string) => void
    editCardHandler: (cardId: string) => void
    card_id: string
}


export const TableDataCards: React.FC<TableDataCardsPropsType> = ({
                                                                      question,
                                                                      answer,
                                                                      updatedDate,
                                                                      updatedTime,
                                                                      grade,
                                                                      removeCard,
                                                                      card_id,
                                                                      editCardHandler,
                                                                      children
                                                                  }) => {


    const appUserId = useSelector<AppRootStateType, string>(state => state.profile.informationAboutUser._id)
    const packUserId = useSelector<AppRootStateType, string>(state => state.cards.packUserId)

    const gridChangeClass = appUserId === packUserId ? cls.gridChangeClass : ""


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
                    color2={'#ffd700'}
                    value={grade}
                    className={cls.stars}
                    edit={false}
                />
            </div>

            {
                appUserId === packUserId
                &&
                <div className={cls.buttonsContainer}>
                    <SuperButton
                        onClick={() => removeCard(card_id)}
                        className={cls.deleteButton}
                    ><span>Delete</span></SuperButton>
                    <SuperButton
                        onClick={() => editCardHandler(card_id)}
                        className={cls.editButton}
                    ><span>Edit</span></SuperButton>
                </div>
            }
        </div>
    )
}