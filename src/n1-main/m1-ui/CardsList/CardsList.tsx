import React, {useCallback, useEffect} from "react";
import cls from "./CardsList.module.scss"
import Search from "../common/Search/Search";
import SuperButton from "../common/SuperButton/SuperButton";
import {useHistory, useParams} from "react-router-dom";
import {getDataCards, setCurrentPage, setPackId, setPageCount} from "../../m2-bll/cardsReducer";
import {useDispatch, useSelector} from "react-redux";
import {TableCards} from "./TableCards/TableCards";
import {PATH} from "../../App";
import {AppRootStateType} from "../../m2-bll/store";
import Paginator from "../common/Paginator/Paginator";


export const CardsList = () => {

    const dispatch = useDispatch()

    const history = useHistory()

    const page = useSelector<AppRootStateType, number>(state => state.cards.cardsRequestParameters.page)
    const packName = useSelector<AppRootStateType, string>(state => state.cards.cardPackName)
    const pageCount = useSelector<AppRootStateType, number>(state => state.cards.cardsRequestParameters.pageCount)
    const cardsTotalCount = useSelector<AppRootStateType, number>(state => state.cards.cardsTotalCount)

    const appUserId= useSelector<AppRootStateType,string>(state=>state.profile.informationAboutUser._id)



    useEffect(() => {
        dispatch(setPackId(packId))
        dispatch(getDataCards())
    }, [page, pageCount])

    const onCardsPageChanges = useCallback((page: number) => {
        dispatch(setCurrentPage(page + 1))
    }, [dispatch])

    const changeCardsPageCount = useCallback((count: number) => {
        dispatch(setPageCount(count))
    }, [dispatch])


    const {packId} = useParams<{ packId: string }>()

    return (
        <div className={cls.cardslistContainer}>
            <div className={cls.card}>
                <div className={cls.cardslist}>
                    <h2 className={cls.cardslistTitle}><span onClick={() => {
                        history.push(PATH.PACKS_LIST)
                    }}>ПЕРЕЙТИ НАЗАД  </span>{packName}</h2>
                    <div className={cls.search_AddButtonContainer}>
                        <Search className={cls.search}/>
                        <div className={cls.addButtonContainer}>
                            {/*{appUserId ===  <SuperButton className={cls.addPackButton}*/}
                            {/*              onClick={() => {*/}
                            {/*              }}><span>Add new card</span></SuperButton>}*/}
                        </div>
                    </div>
                    <TableCards/>
                    <Paginator
                        pageCount={pageCount}
                        itemsTotalCount={cardsTotalCount}
                        onPageChanges={onCardsPageChanges}
                        changePageCount={changeCardsPageCount}
                    />
                </div>
            </div>
        </div>
    )
}