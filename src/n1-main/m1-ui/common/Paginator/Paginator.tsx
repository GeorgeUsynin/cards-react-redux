import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/store";
import {setCurrentPage} from "../../../m2-bll/packsReducer";
import styles from "./Paginator.module.scss"


const Paginator = () => {

    const cardPacksTotalCount = useSelector<AppRootStateType, number>(state => state.packs.cardPacksTotalCount)
    const page = useSelector<AppRootStateType, number>(state => state.packs.page)
    const pageCount = useSelector<AppRootStateType, number>(state => state.packs.pageCount)


    const dispatch = useDispatch()

    let pages = [];
    for (let i = 1; i <= cardPacksTotalCount/pageCount; i++) {
        pages.push(i);
    }

    const onPageChanges = (page: number) => {
        dispatch(setCurrentPage(page))
        // dispatch(getPageCountAC(page, pageCount))
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