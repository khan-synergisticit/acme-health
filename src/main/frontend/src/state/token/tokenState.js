import {AddTokenStateToStore} from "../action/actionTypes";

const Token_State = {
    tokenValidity: ""
}

let TokenReducer = (state = Token_State, action) => {
    switch(action.type) {
        case AddTokenStateToStore:
            return {...state, tokenValidity:action.payload}
        default:
            return state;
    }
}

export default TokenReducer;