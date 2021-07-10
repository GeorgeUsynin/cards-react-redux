import React, {useState} from "react";
import cls from "./TableHeaderCards.module.scss"
import {useDispatch} from "react-redux";
import {setCardsCountDirection, setUpdatedDirection} from "../../../../m2-bll/packsReducer";
import downArrow from "../../../../../assets/images/DownSort.svg"
import upArrow from "../../../../../assets/images/UpSort.svg"


type TableHeaderType = {
    className: string
}
// type ArrowType = "down" | "up"
//
// export type UpdatedDirectionType = "0updated" | "1updated"
//
// export type CardsCountDirectionType = "0cardsCount" | "1cardsCount"

export const TableHeaderCards: React.FC<TableHeaderType> = ({className}) => {

    // const dispatch = useDispatch()
    //
    // const [cardsArrow, setCardsArrow] = useState<ArrowType>('down')
    // const [updatedArrow, setUpdatedArrow] = useState<ArrowType>('down')
    //
    // const changeUpdatedDirection = () => {
    //     setUpdatedArrow(updatedArrow === "down" ? "up" : "down")
    //     switch (updatedArrow) {
    //         case "down":
    //             dispatch(setUpdatedDirection("1updated"))
    //             break
    //         case "up":
    //             dispatch(setUpdatedDirection("0updated"))
    //             break
    //     }
    // }
    //
    // const changeCardsCountDirection = () => {
    //     setCardsArrow(cardsArrow === "down" ? "up" : "down")
    //     switch (cardsArrow) {
    //         case "down":
    //             dispatch(setCardsCountDirection("1cardsCount"))
    //             break
    //         case "up":
    //             dispatch(setCardsCountDirection("0cardsCount"))
    //             break
    //     }
    // }

    return (
        <div className={`${className} ${cls.tableHeader}`}>
            <div>Question</div>
            <div>Answer</div>
            <div>Last Updated</div>
            <div>Grade</div>
        </div>
    )
}