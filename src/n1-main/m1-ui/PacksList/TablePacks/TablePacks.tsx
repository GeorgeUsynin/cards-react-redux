import React from "react";
import cls from "./TablePacks.module.scss"
import {TableHeader} from "./TableHeader/TableHeader";
import {TableData} from "./TableData/TableData";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/store";
import {CardPackType} from "../../../m2-bll/packsReducer";

type TablePacksProspType = {
    removePack: (packId: string) => void
}

export const TablePacks: React.FC<TablePacksProspType> = ({removePack}) => {


    const packsData = useSelector<AppRootStateType, Array<CardPackType>>(state => state.packs.cardPacks)
    const appUserId = useSelector<AppRootStateType, string>(state => state.profile.informationAboutUser._id)



    return (
        <div className={cls.tableContainer}>
            <TableHeader className={cls.tableHeader}/>
            {
                packsData.map(pack => {

                    const updatedDate = pack.updated.slice(0,10)
                    const updatedTime = pack.updated.slice(11,19)
                    const createdDate = pack.created.slice(0,10)
                    const createdTime = pack.created.slice(11,19)

                    return (
                        <TableData
                            name={pack.name}
                            _id={pack._id}
                            cardsCount={pack.cardsCount}
                            created={pack.created}
                            updatedDate={updatedDate}
                            updatedTime={updatedTime}
                            createdDate={createdDate}
                            createdTime={createdTime}
                            user_id={pack.user_id}
                            key={pack._id}
                            removePack={removePack}
                            appUserId={appUserId}
                        />
                    )
                })
            }
        </div>
    )
}