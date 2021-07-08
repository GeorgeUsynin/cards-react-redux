import React, {useState} from "react";
import cls from "./TableHeader.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {setUpdatedDirection} from "../../../../m2-bll/packsReducer";
import {AppRootStateType} from "../../../../m2-bll/store";
import downArrow from "../../../../../assets/images/DownSort.svg"
import upArrow from "../../../../../assets/images/UpSort.svg"


type TableHeaderType = {
    className: string
}
type ArrowType = "down" | "up"


export type UpdatedDirectionType = "0updated" | "1updated"

export const TableHeader: React.FC<TableHeaderType> = ({className}) => {

    const dispatch = useDispatch()

    const updatedDirection = useSelector<AppRootStateType, UpdatedDirectionType>(state => state.packs.cardPacksRequestParameters.sortPacks)

    const [arrow, setArrow] = useState<ArrowType>('down')

    const changeUpdatedDirection = () => {
        setArrow(arrow === "down" ? "up" : "down")
        switch (updatedDirection) {
            case "0updated":
                dispatch(setUpdatedDirection("1updated"))
                break
            case "1updated":
                dispatch(setUpdatedDirection("0updated"))
                break
        }
    }

    return (
        <div className={`${className} ${cls.tableHeader}`}>
            <div>Name</div>
            <div>Cards</div>
            <div>Last Updated <span onClick={changeUpdatedDirection}>
                <img src={arrow === "down" ? downArrow : upArrow} alt=""/>
            </span></div>
            <div>Last Created</div>
            <div>Actions</div>
        </div>
    )
}