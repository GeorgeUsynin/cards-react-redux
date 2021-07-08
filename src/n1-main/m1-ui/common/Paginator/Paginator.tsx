import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/store";
import styles from "./Paginator.module.scss"
import {getDataPacks, setCurrentPage} from "../../../m2-bll/packsReducer";


const Paginator = () => {

    const cardPacksTotalCount = useSelector<AppRootStateType, number>(state => state.packs.cardPacksTotalCount)
    const page = useSelector<AppRootStateType, number>(state => state.packs.cardPacksRequestParameters.page)
    const pageCount = useSelector<AppRootStateType, number>(state => state.packs.cardPacksRequestParameters.pageCount)


    const dispatch = useDispatch()

    let pages = [];
    for (let i = 1; i <= 30 / pageCount; i++) {
        pages.push(i);
    }

    const onPageChanges = (page: number) => {
        dispatch(setCurrentPage(page))
    }

    return <div>
        <div>
            {(pages || []).map((p) => {
                return <span
                    className={page === p ? styles.selectedPage : ""}
                    key={p}
                    onClick={() => {
                        onPageChanges(p)
                    }}>{p}</span>
            })}
        </div>
    </div>
}

export default Paginator;