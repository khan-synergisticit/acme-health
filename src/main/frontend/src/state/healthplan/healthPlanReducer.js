import {AddHealthPlanToStore} from "../action/actionTypes";

const HealthPlan_State = {
    HealthPlan:{
        healthPlanId: "",
        healthPlanName: "",
        healthPlanMetalLevel: "",
        healthPlanType: "",
        healthPlanFormulary: "",
        healthPlanPremium: 0,
        healthPlanDeductible: 0,
        healthPlanCoPayment: "",
        healthPlanBenefit: "",
        healthPlanCoverage:"",
        age: 0,
        numberOfMembers: 0,
    },
}

let HealthPlanReducer = (state = HealthPlan_State, action) =>{
    switch(action.type) {
        case AddHealthPlanToStore:
            return {...state, HealthPlan:action.payload}
        default:
            return state;
    }
}

export default HealthPlanReducer;