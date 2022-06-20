export type Action = {type: "ADD_TOKEN"|"ADD_USER"|"ADD_ID"; payload: string}

export const addToken = (token: string): Action => ({
    type: "ADD_TOKEN",
    payload: token 
})

export const addUser = (usuario: string): Action =>({
    type: "ADD_USER",
    payload: usuario 
})

export const addId = (id: string): Action =>({
    type: "ADD_ID",
    payload: id 
})