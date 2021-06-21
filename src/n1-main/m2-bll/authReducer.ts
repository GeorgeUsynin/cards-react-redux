type InitialStateType = {}

type ActionsType = { type: 'type' }

export const authReducer = (state: InitialStateType = {}, action: ActionsType): InitialStateType => {
    switch (action.type) {
        default:
            return {...state}
    }
}