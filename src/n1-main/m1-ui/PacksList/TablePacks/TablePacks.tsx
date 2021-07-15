import React from "react";
import cls from "./TablePacks.module.scss"
import {TableHeaderPacks} from "./TableHeaderPacks/TableHeaderPacks";
import {TableDataPacks} from "./TableDataPacks/TableDataPacks";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/store";
import {CardPackType} from "../../../m2-bll/packsReducer";
import {Preloader} from "../../common/preloader/Preloader";

export const TablePacks: React.FC = () => {
    const packsData = useSelector<AppRootStateType, Array<CardPackType>>(state => state.packs.cardPacks)
    const appUserId = useSelector<AppRootStateType, string>(state => state.profile.informationAboutUser._id)
    const isFetchingPacks = useSelector<AppRootStateType, boolean>(state => state.packs.isFetching)
    const cardPacksTotalCount = useSelector<AppRootStateType, number>(state => state.packs.cardPacksTotalCount)

    return (
        <div className={cls.tableContainer}>
            <TableHeaderPacks className={cls.tableHeader}/>
            {
                isFetchingPacks
                    ?
                    <Preloader/>
                    :
                    cardPacksTotalCount !== 0
                        ?
                        packsData.map(pack => {

                            const updatedDate = pack.updated.slice(0, 10)
                            const updatedTime = pack.updated.slice(11, 19)

                            return (
                                <TableDataPacks
                                    name={pack.name}
                                    _id={pack._id}
                                    cardsCount={pack.cardsCount}
                                    createdBy={pack.user_name}
                                    updatedDate={updatedDate}
                                    updatedTime={updatedTime}
                                    user_id={pack.user_id}
                                    key={pack._id}
                                    appUserId={appUserId}

                                />
                            )
                        })
                        :
                        <p className={cls.noPacksTitle}>You don't have any packs. Please create a new one</p>
            }
        </div>
    )
}