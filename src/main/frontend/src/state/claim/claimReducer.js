import {AddClaimToStore} from "../action/actionTypes";

const Claim_State = {
    Claim:{
        claims:[]
    },
}

let ClaimReducer = (state = Claim_State, action) =>{
    switch(action.type) {
        case AddClaimToStore:
            return {...state, Claim:action.payload}
        default:
            return state;
    }
}

export default ClaimReducer;