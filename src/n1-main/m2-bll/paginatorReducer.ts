
const initialState = {
    page: 1,
    pageCount: 4
}
type InitialStateType = typeof initialState

export const paginatorReducer = (state: InitialStateType = initialState, action: PaginatorActionsType): InitialStateType => {
    switch (action.type) {
        case 'paginator/SET-CURRENT-PAGE':
            return {
                ...state,
                page: action.page
            }
        case 'paginator/GET-PAGE-COUNT':
            return {
                ...state,
                page: action.page,
                pageCount: action.pageCount
            }
        default:
            return state
    }
}
// actions
export const setCurrentPageAC = (page: number) =>
    ({type: 'paginator/SET-CURRENT-PAGE', page} as const)
export const getPageCountAC = (page: number, pageCount: number) =>
    ({type: 'paginator/GET-PAGE-COUNT', page, pageCount} as const)




export type PaginatorActionsType = ReturnType<typeof setCurrentPageAC | typeof getPageCountAC>