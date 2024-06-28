import * as ActionType from "../action/actionTypes";
import {AxiosUsersClient} from "../../utils/axios/axiosState";


const axiosInstance = AxiosUsersClient();

export const AddTransactionToStore =(id)=>{
    return{
        type:ActionType.AddTransactionToStore,
        payload:id
    }
}

export const FetchPublicTransactionFromDB =(id)=>{
    let header = {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
    }
    return (dispatch) =>{
        axiosInstance.post('/publicTransaction?id='+id, {headers: header})
            .then((data)=>{
                console.log('transaction: ' + JSON.stringify(data.data))
                dispatch(AddTransactionToStore(data.data));
            })
            .catch((error)=>{
                console.log("transaction error" + error)
            })
    }

}