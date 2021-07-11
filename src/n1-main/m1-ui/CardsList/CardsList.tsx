import React, {useEffect} from "react";
import cls from "./CardsList.module.scss"
import Search from "../common/Search/Search";
import SuperButton from "../common/SuperButton/SuperButton";
import {useHistory, useParams} from "react-router-dom";
import {getDataCards, setPackId} from "../../m2-bll/cardsReducer";
import {useDispatch} from "react-redux";
import {TableCards} from "./TableCards/TableCards";
import {PATH} from "../../App";


export const CardsList = () => {

    const dispatch = useDispatch()

    const history = useHistory()

    useEffect(() => {
        dispatch(setPackId(packId))
        dispatch(getDataCards())
    },[])


    const {packId} = useParams<{ packId: string }>()

    return (
        <div className={cls.cardslistContainer}>
            <div className={cls.card}>
                <div className={cls.cardslist}>
                    <h2 className={cls.cardslistTitle}><span onClick={()=>{history.push(PATH.PACKS_LIST)}}>ПЕРЕЙТИ НАЗАД  </span>Packs list</h2>
                    <div className={cls.search_AddButtonContainer}>
                        <Search className={cls.search}/>
                        <div className={cls.addButtonContainer}>
                            <SuperButton className={cls.addPackButton}
                                         onClick={() => {
                                         }}><span>Add new card</span></SuperButton>
                        </div>
                    </div>
                    <TableCards/>
                    {/*<Paginator pageCount={pageCount}/>*/}
                </div>
            </div>
        </div>
    )
}