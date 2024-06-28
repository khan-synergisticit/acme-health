import {AddStripeToStore} from "../action/actionTypes";

const Stripe_State = {
    Stripe:{
        clientSecret:"",
    },
}

let StripeReducer = (state = Stripe_State, action) =>{
    switch(action.type) {
        case AddStripeToStore:
            return {...state, Stripe:action.payload}
        default:
            return state;
    }
}

export default StripeReducer;