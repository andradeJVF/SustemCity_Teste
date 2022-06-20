import { Action } from './actions';

export interface UserState {
    tokens: string
    user: string
    id: string
}

const initialState = {
    tokens: "",
    user: "",
    id: ""
}

export const userReducer = (state: UserState = initialState, action: Action) => {
    switch (action.type) {
        case "ADD_TOKEN": {
            return { tokens: action.payload, user: state.user, id: state.id }
        }
        case "ADD_USER": {
            return { user: action.payload, tokens: state.tokens, id: state.id }
        }
        case "ADD_ID": {
            return { id: action.payload, tokens: state.tokens, user: state.user }
        }
        default:
            return state
    }
}