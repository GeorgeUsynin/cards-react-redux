import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../m2-bll/store";
import {CardResponseType} from "../../m3-dal/apiCards";
import cls from "./Learn.module.scss"
import {Preloader} from "../common/preloader/Preloader";
import {getCardsToLearn, setPackId} from "../../m2-bll/learnReducer";

export const Learn = () => {

    const dispatch = useDispatch()

    const cards = useSelector<AppRootStateType, Array<CardResponseType>>(state => state.learn.cards)
    const isFetching = useSelector<AppRootStateType, boolean>(state => state.learn.isFetching)
    const packName = useSelector<AppRootStateType, string>(state => state.learn.packName)

    const {packId} = useParams<{ packId: string }>()

    dispatch(setPackId(packId))

    useEffect(() => {
        dispatch(getCardsToLearn())
    }, [dispatch])

    const getCard = (cards: Array<CardResponseType>) => {
        const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
        const rand = Math.random() * sum;
        const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
                const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
                return {sum: newSum, id: newSum < rand ? i : acc.id}
            }
            , {sum: 0, id: -1});
        console.log('test: ', sum, rand, res)

        return cards[res.id + 1];
    }

    return (
        <div>
            {
                isFetching
                    ?
                    <Preloader/>
                    :
                    cards.length === 0
                        ?
                        <p>No cards to learn</p>
                        :
                        <div className={cls.card}>
                            <h2 className={cls.title}>{`Learn "${packName}"`}</h2>
                            <p>{`Question: ${getCard(cards).question} `}</p>
                        </div>
            }
        </div>
    )
}