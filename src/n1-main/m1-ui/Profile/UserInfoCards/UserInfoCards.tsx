import React from "react";
import cls from "./UserInfoCards.module.scss";

type UserInfoCardsType = {
    publicCardPacksCount: number
}

export const UserInfoCards: React.FC<UserInfoCardsType> = ({publicCardPacksCount}) => {
    return (
        <div className={cls.infoUserCards}>
            <p className={cls.userCards}>Number of cards: {publicCardPacksCount}</p>
        </div>
    )
}