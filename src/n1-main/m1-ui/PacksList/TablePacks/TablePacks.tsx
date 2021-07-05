import React, {useEffect} from "react";
import cls from "./TablePacks.module.scss"
import {TableHeader} from "./TableHeader/TableHeader";
import {TableData} from "./TableData/TableData";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/store";
import {CardPackType} from "../../../m2-bll/packsReducer";

export const TablePacks = () => {


    const packsData = useSelector<AppRootStateType, Array<CardPackType>>(state => state.packs.cardPacks)

    return (
        <div className={cls.tableContainer}>
            <TableHeader className={cls.tableHeader}/>
            {
                packsData.map(pack => {
                    return (
                        <TableData
                            name={pack.name}
                            _id={pack._id}
                            cardsCount={pack.cardsCount}
                            created={pack.created}
                            updated={pack.updated}
                            user_id={pack.user_id}
                            key={pack._id}
                        />
                    )
                })
            }
        </div>
    )
}