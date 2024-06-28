import * as ActionType from "../action/actionTypes";
import {AxiosUsersClient} from "../../utils/axios/axiosState";


const axiosInstance = AxiosUsersClient();

export const AddStripeToStore =(id)=>{
    return{
        type:ActionType.AddStripeToStore,
        payload:id
    }
}

export const CreateStripe = (checkoutItem) =>{
    return (dispatch)=>{

        let header = {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
        }
        axiosInstance.post('/api/checkout/create', checkoutItem, {headers: header})
            .then((data)=>{
                console.log('stripe: ' + JSON.stringify(data.data))
                dispatch(AddStripeToStore(data.data));
            })
            .catch((error)=>{
                console.log("Error saving stripe." + error)
            })
    }
}