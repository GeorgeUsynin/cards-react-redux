import React from "react";
import cls from "./UserInfoCards.module.scss";
import {DoubleRange} from "../../PacksList/DoubleRange/DoubleRange";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/store";

type UserInfoCardsType = {
    publicCardPacksCount: number
}

export const UserInfoCards: React.FC<UserInfoCardsType> = ({publicCardPacksCount}) => {

    const maxCount = useSelector<AppRootStateType, number>(state => state.packs.maxCardsCount)
    const isFetchingPacks = useSelector<AppRootStateType, boolean>(state => state.packs.isFetching)

    return (
        <div className={cls.infoUserCards}>
            <p className={cls.numberTitle}>Number of cards</p>
            <div className={cls.doubleRangeContainer}>
                {!isFetchingPacks && <DoubleRange
                    maxCount={maxCount}
                />}
            </div>
        </div>
    )
}