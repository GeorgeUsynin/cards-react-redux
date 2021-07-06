import React, {useCallback, useEffect} from "react";
import cls from "./PacksList.module.scss"
import SuperButton from "../common/SuperButton/SuperButton";
import SuperInputText from "../common/SuperInput/SuperInputText";
import {TablePacks} from "./TablePacks/TablePacks";
import Search from "../common/Search/Search";

import {useDispatch} from "react-redux";
import {createNewPack, deletePack, getDataPacks} from "../../m2-bll/packsReducer";
import Paginator from "../common/Paginator/Paginator";


export const PacksList = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDataPacks())
    }, [])


    const addPack = useCallback(() => {
        const newPackName = prompt('Enter the name of the new pack: ')
        if (newPackName)
            dispatch(createNewPack(newPackName))
    }, [dispatch])


    const removePack = useCallback((packId: string) => {
        dispatch(deletePack(packId))
    }, [dispatch])


    return (
        <div className={cls.packlistContainer}>
            <div className={cls.card}>
                <div className={cls.info}>
                    <p className={cls.ownerTitle}>Show packs cards</p>
                    <div className={cls.buttonsContainer}>
                        <SuperButton className={cls.myButton}>My</SuperButton>
                        <SuperButton className={cls.allButton}>All</SuperButton>
                    </div>
                    <p className={cls.numberTitle}>Number of cards</p>
                    <SuperInputText type={'range'} className={cls.range}/>
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
                    <TablePacks removePack={removePack}/>
                    <Paginator/>
                </div>
            </div>
        </div>
    )
}