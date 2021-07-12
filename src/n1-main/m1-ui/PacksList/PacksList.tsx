import React, {useCallback, useEffect, useState} from "react";
import cls from "./PacksList.module.scss"
import SuperButton from "../common/SuperButton/SuperButton";
import {TablePacks} from "./TablePacks/TablePacks";
import Search from "../common/Search/Search";

import {useDispatch, useSelector} from "react-redux";
import {
    createNewPack,
    deletePack,
    getDataPacks,
    setCurrentPage,
    setPageCount,
    setUserId
} from "../../m2-bll/packsReducer";
import {AppRootStateType} from "../../m2-bll/store";
import {isLoggedInApp} from "../../m2-bll/authReducer";
import {Redirect} from "react-router-dom";
import {PATH} from "../../App";
import {DoubleRange} from "./DoubleRange/DoubleRange";
import Paginator from "../common/Paginator/Paginator";
import {CardsCountDirectionType, UpdatedDirectionType} from "./TablePacks/TableHeaderPacks/TableHeaderPacks";
import {Preloader} from "../common/preloader/Preloader";

type ButtonNameType = 'my' | 'all'

export const PacksList = () => {

    const dispatch = useDispatch()

    const id = useSelector<AppRootStateType, string>(state => state.profile.informationAboutUser._id)

    const error = useSelector<AppRootStateType, string | null>(state => state.auth.error)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const page = useSelector<AppRootStateType, number>(state => state.packs.cardPacksRequestParameters.page)
    const pageCount = useSelector<AppRootStateType, number>(state => state.packs.cardPacksRequestParameters.pageCount)
    const packName = useSelector<AppRootStateType, string>(state => state.packs.cardPacksRequestParameters.packName)
    const updatedDirection = useSelector<AppRootStateType, UpdatedDirectionType | CardsCountDirectionType>(state => state.packs.cardPacksRequestParameters.sortPacks)
    const currentUserId = useSelector<AppRootStateType, string>(state => state.packs.cardPacksRequestParameters.user_id)
    const minCards = useSelector<AppRootStateType, number>(state => state.packs.cardPacksRequestParameters.minCardsCount)
    const maxCards = useSelector<AppRootStateType, number>(state => state.packs.cardPacksRequestParameters.maxCardsCount)
    const cardPacksTotalCount = useSelector<AppRootStateType, number>(state => state.packs.cardPacksTotalCount)
    const isFetchingPacks = useSelector<AppRootStateType, boolean>(state => state.packs.isFetching)


    const [activeClass, setActiveClass] = useState(cls.active)
    const [buttonName, setButtonName] = useState<ButtonNameType>('all')

    useEffect(() => {
        if (!isLoggedIn) {
            if (!error) dispatch(isLoggedInApp())
        } else {
            dispatch(getDataPacks())
        }
    }, [isLoggedIn, dispatch, page, pageCount, packName, currentUserId, updatedDirection, minCards, maxCards])


    const addPack = useCallback(() => {
        const newPackName = prompt('Enter the name of the new pack: ')
        if (newPackName)
            dispatch(createNewPack(newPackName))
    }, [dispatch])


    const removePack = useCallback((packId: string) => {
        dispatch(deletePack(packId))
    }, [dispatch])


    const getMyPacksList = useCallback(() => {
        setButtonName('my')
        dispatch(setUserId(id))
    }, [id, dispatch])

    const getAllPacksList = useCallback(() => {
        setButtonName('all')
        dispatch(setUserId(""))
    }, [dispatch])

    const onPacksPageChanges = useCallback((page: number) => {
        dispatch(setCurrentPage(page+1))
    },[dispatch])

    const changePacksPageCount = useCallback((count: number) => {
        dispatch(setPageCount(count))
    },[dispatch])

    if (error) {
        return <Redirect to={PATH.LOGIN}/>
    }


    return (
        <div className={cls.packlistContainer}>
            <div className={cls.card}>
                <div className={cls.info}>
                    <p className={cls.ownerTitle}>Show packs cards</p>
                    <div className={cls.buttonsContainer}>
                        <SuperButton
                            className={buttonName === 'my' ? `${cls.myButton} ${activeClass}` : cls.myButton}
                            onClick={getMyPacksList}
                            onMouseEnter={() => setActiveClass("")}
                            onMouseOut={() => setActiveClass(cls.active)}
                        >My</SuperButton>
                        <SuperButton
                            className={buttonName === "all" ? `${cls.allButton} ${activeClass}` : cls.allButton}
                            onClick={getAllPacksList}
                            onMouseEnter={() => setActiveClass("")}
                            onMouseOut={() => setActiveClass(cls.active)}
                        >All</SuperButton>
                    </div>
                    <p className={cls.numberTitle}>Number of cards</p>
                    <DoubleRange/>
                </div>
                <div className={cls.packslist}>
                    <h2 className={cls.packslistTitle}>Packs list</h2>
                    <div className={cls.search_AddButtonContainer}>
                        <Search className={cls.search}/>
                        <div className={cls.addButtonContainer}>
                            <SuperButton className={cls.addPackButton}
                                         onClick={addPack}><span>Add new pack</span></SuperButton>
                        </div>
                    </div>
                    <TablePacks removePack={removePack} pageCount={pageCount}/>
                    {!!cardPacksTotalCount && <Paginator
                        pageCount={pageCount}
                        itemsTotalCount={cardPacksTotalCount}
                        onPageChanges={onPacksPageChanges}
                        changePageCount={changePacksPageCount}
                    />}
                </div>
            </div>
        </div>
    )
}