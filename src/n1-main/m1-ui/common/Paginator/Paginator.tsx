import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from '../../../m2-bll/store'
import styles from './Paginator.module.scss'
import ReactPaginate from 'react-paginate'
import SuperSelect from '../SuperSelect/SuperSelect'
import {setCurrentPage, setPageCount} from "../../../m2-bll/packsReducer";

type PaginatorPropsType = {
  pageCount: number
}


const Paginator = ({pageCount}:PaginatorPropsType) => {
  const dispatch = useDispatch()

  const cardPacksTotalCount = useSelector<AppRootStateType, number>(state => state.packs.cardPacksTotalCount)

  const onPageChanges = (page: number) => {
    dispatch(setCurrentPage(page+1))
  }
  const changePageCount = (count: number) => {
    dispatch(setPageCount(count))
  }


  return <div className={styles.paginatorPage}>
    <ReactPaginate
      pageCount={Math.ceil(cardPacksTotalCount/pageCount)}
      marginPagesDisplayed={1}
      pageRangeDisplayed={5}
      previousLabel={'<'}
      previousClassName={styles.prev}
      nextLabel={'>'}
      nextClassName={styles.next}
      activeClassName={styles.selectedPage}
      onPageChange={(page) => onPageChanges(page.selected)}
      containerClassName={styles.container}
      pageClassName={styles.page}
    />
    <div className={styles.sortContainer}>
      Show<SuperSelect
        className={styles.superSelect}
        options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        value={pageCount}
        onChange={(e) => changePageCount(+e.currentTarget.value)}
      /> Cards per Page
    </div>
  </div>
}

export default Paginator