import styles from "./Paginator.module.css";
import React from "react";
import {useDispatch} from "react-redux";
import {getPageCountAC, setCurrentPageAC} from "../../../m2-bll/paginatorReducer";


const Paginator = () => {

    /*из GET запроса мы получаем*/
    const cardPacksTotalCount = 14
    const maxCardsCount = 4
    const minCardsCount = 0
    const page = 1
    const pageCount = 4
// я взяла эти значения из таблицы Игната, но мы их будем получать из запроса на сервер

    const dispatch = useDispatch()
    let pages = [];
    for (let i = 1; i <= cardPacksTotalCount; i++) {
        pages.push(i);
    }

    const onPageChanges = (page: number) => {
        dispatch(setCurrentPageAC(page))
        dispatch(getPageCountAC(page, pageCount))
    }

    return <div>
        <div>
            {(pages || []).map((p) => {
                return <span key={p} className={page === p ? styles.selectedPage : ""}
                             onClick={(e) => {
                                 onPageChanges(p)
                             }}>{p}</span>
            })}
        </div>
    </div>
}
export default Paginator;