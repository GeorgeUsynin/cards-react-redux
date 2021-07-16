import React, {KeyboardEvent, useCallback, useEffect, useState} from 'react'
import cls from './Profile.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../m2-bll/store";
import {Redirect} from 'react-router-dom';
import {isLoggedInApp} from "../../m2-bll/authReducer";
import {UserInfo} from "./UserInfo/UserInfo";
import {UserInfoCards} from "./UserInfoCards/UserInfoCards";
import {PATH} from "../../App";
import Search from "../common/Search/Search";
import SuperButton from "../common/SuperButton/SuperButton";
import {TablePacks} from "../PacksList/TablePacks/TablePacks";
import Paginator from "../common/Paginator/Paginator";
import {
    createNewPack,
    deletePack,
    editPack, getDataPacks,
    setCurrentPage,
    setPageCount,
    setSearchName, setUserId
} from "../../m2-bll/packsReducer";
import {CardsCountDirectionType, UpdatedDirectionType} from "../PacksList/TablePacks/TableHeaderPacks/TableHeaderPacks";
import {AddPackForm} from "../PacksList/AddPackForm/AddPackForm";
import Modal from "../common/Modal/Modal";


export const Profile = () => {

    const dispatch = useDispatch()

    const error = useSelector<AppRootStateType, string | null>(state => state.auth.error)

    const [activeModal, setActiveModal] = useState<boolean>(false)

    const avatar = useSelector<AppRootStateType, string>(state => state.profile.informationAboutUser.avatar)
    const name = useSelector<AppRootStateType, string>(state => state.profile.informationAboutUser.name)
    const publicCardPacksCount = useSelector<AppRootStateType, number>(state => state.profile.informationAboutUser.publicCardPacksCount)
    const id = useSelector<AppRootStateType, string>(state => state.profile.informationAboutUser._id)
    const cardPacksTotalCount = useSelector<AppRootStateType, number>(state => state.packs.cardPacksTotalCount)
    const pageCount = useSelector<AppRootStateType, number>(state => state.packs.cardPacksRequestParameters.pageCount)
    const minCards = useSelector<AppRootStateType, number>(state => state.packs.cardPacksRequestParameters.minCardsCount)
    const maxCards = useSelector<AppRootStateType, number>(state => state.packs.cardPacksRequestParameters.maxCardsCount)
    const page = useSelector<AppRootStateType, number>(state => state.packs.cardPacksRequestParameters.page)
    const packName = useSelector<AppRootStateType, string>(state => state.packs.cardPacksRequestParameters.packName)
    const updatedDirection = useSelector<AppRootStateType, UpdatedDirectionType | CardsCountDirectionType>(state => state.packs.cardPacksRequestParameters.sortPacks)

    useEffect(() => {
        if (!id) {
            dispatch(isLoggedInApp())
        } else {
            dispatch(setUserId(id))
            dispatch(getDataPacks())
            dispatch(setUserId(""))
        }
    }, [id, dispatch, page, pageCount, packName, updatedDirection, minCards, maxCards])

    const openModal = () => {
        setActiveModal(true)
    }

    const handlePressSearch = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        dispatch(setSearchName(e.currentTarget.value))
        e.currentTarget.blur()
    }, [dispatch])

    const addPack = useCallback(() => {
        const newPackName = prompt('Enter the name of the new pack: ')
        if (newPackName)
            dispatch(createNewPack(newPackName))
    }, [dispatch])


    const onPacksPageChanges = useCallback((page: number) => {
        dispatch(setCurrentPage(page + 1))
    }, [dispatch])

    const changePacksPageCount = useCallback((count: number) => {
        dispatch(setPageCount(count))
    }, [dispatch])

    if (error) {
        return <Redirect to={PATH.LOGIN}/>
    }

    return (
        <div className={cls.profileContainer}>
            <div className={cls.card}>
                <div className={cls.info}>
                    <UserInfo avatar={avatar} name={name}/>
                    <UserInfoCards publicCardPacksCount={publicCardPacksCount}/>
                </div>
                <div className={cls.packslist}>
                    <h2 className={cls.packslistTitle}>My packs list</h2>
                    <div className={cls.search_AddButtonContainer}>
                        <Search className={cls.search} handlePressSearch={handlePressSearch}/>
                        <Modal active={activeModal} setActive={setActiveModal}>
                            <AddPackForm active={activeModal} setActive={setActiveModal}/>
                        </Modal>
                        <div className={cls.addButtonContainer}>
                            <SuperButton className={cls.addPackButton} onClick={openModal}>
                                <span>Add new pack</span>
                            </SuperButton>
                        </div>
                    </div>
                    <TablePacks/>
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