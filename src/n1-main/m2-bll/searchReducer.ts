
const initialState = {
    request: ""
}
type InitialStateType = typeof initialState

export const searchReducer = (state: InitialStateType = initialState, action: SearchingActionsType): InitialStateType => {
    switch (action.type) {
        case 'search/START-SEARCHING':
            return {...state, request: action.value}
        default:
            return state
    }
}
// actions
export const startSearchingAC = (value: string) =>
    ({type: 'search/START-SEARCHING', value} as const)




export type SearchingActionsType = ReturnType<typeof startSearchingAC>