import React from 'react'
import styles from './Paginator.module.scss'
import ReactPaginate from 'react-paginate'
import SuperSelect from '../SuperSelect/SuperSelect'

type PaginatorPropsType = {
    pageCount: number
    itemsTotalCount: number
    onPageChanges: (page: number) => void
    changePageCount: (count: number) => void
}


const Paginator = ({pageCount, itemsTotalCount, changePageCount, onPageChanges}: PaginatorPropsType) => {

    return <div className={styles.paginatorPage}>
        <ReactPaginate
            pageCount={Math.ceil(itemsTotalCount / pageCount)}
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