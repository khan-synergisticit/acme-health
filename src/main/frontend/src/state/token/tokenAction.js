import * as ActionType from "../action/actionTypes";

export const InvalidToken = () =>{
    return{
        type:ActionType.AddTokenStateToStore,
        payload: ActionType.InvalidToken
    }
}

export const ValidToken = () =>{
    return{
        type:ActionType.AddTokenStateToStore,
        payload: ActionType.ValidToken
    }
}