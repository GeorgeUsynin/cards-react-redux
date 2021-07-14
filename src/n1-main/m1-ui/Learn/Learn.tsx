import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../m2-bll/store";
import {CardResponseType} from "../../m3-dal/apiCards";
import cls from "./Learn.module.scss"
import {Preloader} from "../common/preloader/Preloader";
import {getCardsToLearn, setPackId} from "../../m2-bll/learnReducer";
import SuperButton from "../common/SuperButton/SuperButton";

const grades = ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer'];

export const Learn = () => {

    const dispatch = useDispatch()

    const [showAnswer, setShowAnswer] = useState(false)

    const cards = useSelector<AppRootStateType, Array<CardResponseType>>(state => state.learn.cards)
    const isFetching = useSelector<AppRootStateType, boolean>(state => state.learn.isFetching)
    const packName = useSelector<AppRootStateType, string>(state => state.learn.packName)

    let history = useHistory()

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

        return cards[res.id + 1];
    }

    const cancelHandler = () => {
        history.goBack()
    }

    const setAnswer = (e:any) => {
        console.log(e)
    }

    let generatedCard = cards.length !== 0 ? getCard(cards) : null


    return (
        <div className={cls.learnContainer}>
            {
                showAnswer
                    ?
                    isFetching
                        ?
                        <Preloader/>
                        :
                        cards.length === 0
                            ?
                            <>
                                <p className={`${cls.card} ${cls.noCards}`}>No cards to learn</p>
                            </>
                            :
                            <div className={cls.card}>
                                <h2 className={cls.title}>{`Learn "${packName}"`}</h2>
                                <p><span>Question: </span>{generatedCard && generatedCard.question}</p>
                                <div className={cls.buttonsContainer}>
                                    <SuperButton className={cls.cancelButton}
                                                 onClick={cancelHandler}
                                    >
                                    <span>
                                        Cancel
                                    </span>
                                    </SuperButton>
                                    <SuperButton className={cls.showAnswerButton}>
                                    <span>
                                        Show answer
                                    </span>
                                    </SuperButton>
                                </div>
                            </div>
                    :
                    !generatedCard
                        ?
                        <Preloader/>
                        :
                        <div className={cls.card}>
                            <h2 className={cls.title}>{`Learn "${packName}"`}</h2>
                            <p><span>Question: </span>{generatedCard && generatedCard.question}</p>
                            <p><span>Answer: </span>{generatedCard && generatedCard.answer}</p>
                            {
                                grades.map((grade, index) => {
                                    return (
                                        <div key={index}>
                                            <input type={"radio"} name={"answer"} value={index}
                                                   onClick={(e) => setAnswer(e)}/>{grade}
                                        </div>
                                    )
                                })
                            }

                        </div>
            }
        </div>
    )
}