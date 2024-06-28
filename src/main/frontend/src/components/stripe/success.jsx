import React, {useEffect} from "react";
import { useDispatch} from "react-redux";
import { useSearchParams, useNavigate} from "react-router-dom";
import {SavePolicyToDB} from "../../state/Policy/PolicyAction";


const SuccessComponent = (props) =>{
    const [searchParams, setSearchParams] =useSearchParams()
    let statusParam = (searchParams.get("redirect_status"));
    let piParam = (searchParams.get("payment_intent"))
    let policy = window.localStorage.getItem("policy");
    let dispatch = useDispatch();
    let navigate = useNavigate();
    policy = JSON.parse(policy)
    let policyDetails = {
        policy:policy,
        payment_intent:piParam,
        amount:policy.totalPremium
    }
    useEffect(()=>{
        if(statusParam==="succeeded"){
            dispatch(SavePolicyToDB(policyDetails));
            navigate("/intro", {state:{payment_intent:piParam}});
        }
    },[])

    return(
        <div>
            <h2>PAYMENT SUCCEEDED. PLEASE LOGIN</h2>
        </div>
    )
}

export default SuccessComponent;