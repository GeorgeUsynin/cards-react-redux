import React from "react";
import cls from "./TableDataCards.module.scss"

type TableDataCardsPropsType = {
    question: string
    answer: string
    updatedDate: string
    updatedTime: string
    grade: number
}


export const TableDataCards: React.FC<TableDataCardsPropsType> = ({
                                                                      question,
                                                                      answer,
                                                                      updatedDate,
                                                                      updatedTime,
                                                                      grade,
                                                                      children
                                                                  }) => {

    return (
        <div className={cls.tableData}>
            <div>{question}</div>
            <div>{answer}</div>
            <div>
                <p>Date: {updatedDate}</p>
                <p>Time: {updatedTime}</p>
            </div>
            <div>{grade}</div>
        </div>
    )
}