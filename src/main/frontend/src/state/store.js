import { combineReducers, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./user/userReducer";
import HealthPlanReducer from "./healthplan/healthPlanReducer";
import PolicyReducer from "./Policy/PolicyReducer";
import AuthReducer   from "./auth/authReducer";
import MessageReducer from "./message/message";
import TokenReducer from "./token/tokenState";
import ClaimReducer from "./claim/claimReducer";
import StripeReducer from "./stripe/stripeReducer";
import TransactionReducer from "./transaction/transactionReducer";

const rootReducer = combineReducers({
    UserReducer,
    HealthPlanReducer,
    PolicyReducer,
    AuthReducer,
    MessageReducer,
    TokenReducer,
    ClaimReducer,
    StripeReducer,
    TransactionReducer
});

export default configureStore(
    {reducer: rootReducer},
    {}
)