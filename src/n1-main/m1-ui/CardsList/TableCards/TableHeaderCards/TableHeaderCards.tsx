import React from "react";
import cls from "./TableHeaderCards.module.scss"
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../../m2-bll/store";


type TableHeaderType = {
    className: string
}
// type ArrowType = "down" | "up"
//
// export type UpdatedDirectionType = "0updated" | "1updated"
//
// export type CardsCountDirectionType = "0cardsCount" | "1cardsCount"

export const TableHeaderCards: React.FC<TableHeaderType> = ({className}) => {

    const appUserId = useSelector<AppRootStateType, string>(state => state.profile.informationAboutUser._id)
    const currentPackUserId = useSelector<AppRootStateType, string>(state => state.cards.currentPackUserId)

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

    const gridChangeClass = appUserId === currentPackUserId ? cls.gridChangeClass : ""

    return (
        <div className={`${className} ${cls.tableHeader} ${gridChangeClass}`}>
            <div>Question</div>
            <div>Answer</div>
            <div>Last Updated</div>
            <div>Grade</div>
            {appUserId === currentPackUserId && <div>Actions</div>}
        </div>
    )
}