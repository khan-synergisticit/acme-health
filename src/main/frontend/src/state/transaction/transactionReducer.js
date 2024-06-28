import {AddTransactionToStore} from "../action/actionTypes";

const Transaction_State = {
    Transaction:{
        id:"",
        reference:{},
        amount:""
    },
}

let TransactionReducer = (state = Transaction_State, action) =>{
    switch(action.type) {
        case AddTransactionToStore:
            return {...state, Transaction:action.payload}
        default:
            return state;
    }
}

export default TransactionReducer;