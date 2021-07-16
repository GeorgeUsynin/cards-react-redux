import React, {ChangeEvent, useEffect, useState} from "react";
import {Redirect, useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../m2-bll/store";
import {CardResponseType} from "../../m3-dal/apiCards";
import cls from "./Learn.module.scss"
import {Preloader} from "../common/preloader/Preloader";
import {addCard, getCardsToLearn, sendCardGrade, setChangeCard, setPackId} from "../../m2-bll/learnReducer";
import SuperButton from "../common/SuperButton/SuperButton";
import {PATH} from "../../App";
import {isLoggedInApp} from "../../m2-bll/authReducer";

const grades = ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer'];

export const Learn = () => {

    const dispatch = useDispatch()

    const [showAnswer, setShowAnswer] = useState(false)

    const [currentGrade, setCurrentGrade] = useState(0)

    const error = useSelector<AppRootStateType, string | null>(state => state.auth.error)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const cards = useSelector<AppRootStateType, Array<CardResponseType>>(state => state.learn.cards)
    const isFetching = useSelector<AppRootStateType, boolean>(state => state.learn.isFetching)
    const packName = localStorage.getItem("packName")
    const changeCard = useSelector<AppRootStateType, boolean>(state => state.learn.changeCard)
    const card = useSelector<AppRootStateType, CardResponseType | null>(state => state.learn.card)

    let history = useHistory()

    const {packId} = useParams<{ packId: string }>()

    dispatch(setPackId(packId))

    useEffect(() => {
        if (!isLoggedIn) {
            if (!error) dispatch(isLoggedInApp())
        } else {
            dispatch(getCardsToLearn())
        }
    }, [dispatch])


    //algorithm for getting card
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

    const setGradeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentGrade(+e.target.defaultValue)
    }

    const nextHandler = () => {
        dispatch(sendCardGrade(currentGrade))
        setShowAnswer(false)
        dispatch(setChangeCard(true))
    }

    if (changeCard) {
        dispatch(addCard(getCard(cards)))
        dispatch(setChangeCard(false))
    }

    if (error) {
        return <Redirect to={PATH.LOGIN}/>
    }

    return (
        <div className={cls.learnContainer}>
            {
                !showAnswer
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
                                <p><span>Question: </span>{card && card.question}</p>
                                <div className={cls.buttonsContainer}>
                                    <SuperButton className={cls.cancelButton}
                                                 onClick={cancelHandler}
                                    >
                                    <span>
                                        Cancel
                                    </span>
                                    </SuperButton>
                                    <SuperButton className={cls.showAnswerButton}
                                                 onClick={() => setShowAnswer(true)}
                                    >
                                    <span>
                                        Show answer
                                    </span>
                                    </SuperButton>
                                </div>
                            </div>
                    :
                    !card
                        ?
                        <Preloader/>
                        :
                        <div className={cls.card}>
                            <h2 className={cls.title}>{`Learn "${packName}"`}</h2>
                            <p><span>Question: </span>{card && card.question}</p>
                            <p><span>Answer: </span>{card && card.answer}</p>
                            <p className={cls.answerTitle}>Rate yourself:</p>
                            {
                                grades.map((grade, index) => {
                                    return (
                                        <div key={index} className={cls.answers}>
                                            <label className={cls.label}>
                                                <input type={"radio"} name={"answer"} value={index + 1}
                                                       onChange={setGradeHandler}/>{`${grade}`}
                                            </label>
                                        </div>
                                    )
                                })
                            }
                            <div className={cls.buttonsContainerAnswer}>
                                <SuperButton className={cls.cancelAnswerButton}
                                             onClick={cancelHandler}
                                >
                                    <span>
                                        Cancel
                                    </span>
                                </SuperButton>
                                <SuperButton className={cls.nextButton}
                                             onClick={nextHandler}
                                >
                                    <span>
                                        Next
                                    </span>
                                </SuperButton>
                            </div>
                        </div>
            }
        </div>
    )
}