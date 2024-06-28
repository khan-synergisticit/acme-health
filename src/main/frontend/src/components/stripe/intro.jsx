import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useLocation} from "react-router-dom";
import {FetchPublicTransactionFromDB} from "../../state/transaction/transactionAction";
import TransactionReducer from "../../state/transaction/transactionReducer";

let IntroComponent = (props) => {
    let dispatch = useDispatch();
    let transaction = useSelector((state)=>state.TransactionReducer.Transaction)
    const { state } = useLocation();


    useEffect(()=>{
        dispatch(FetchPublicTransactionFromDB(state.payment_intent)) ;
    },[dispatch])
    let msg = () =>{
        return(
            <div>
                <h4>
                    Transaction Id: {transaction.id}
                </h4>
                <h4>
                    Amount Charged: {transaction.amount}
                </h4>
            </div>
        )
    }
    return(
        <div>
            <h2>PAYMENT SUCCEEDED</h2>
            {transaction && transaction.id !== "" ? msg():null}
        </div>
    )
}

export default IntroComponent;