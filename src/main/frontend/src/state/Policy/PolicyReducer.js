import {AddPolicyToStore} from "../action/actionTypes";

const Policy_State = {
    Policy:{
        policies:[],
    },
}

let PolicyReducer = (state = Policy_State, action) =>{
    switch(action.type) {
        case AddPolicyToStore:
            return {...state, Policy:action.payload}
        default:
            return state;
    }
}

export default PolicyReducer;