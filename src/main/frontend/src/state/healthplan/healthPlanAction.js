import * as ActionType from "../action/actionTypes";
import {AxiosUsersClient} from "../../utils/axios/axiosState";

const axiosInstance = AxiosUsersClient();

export const AddHealthPlanToStore = (healthPlan) => {
    return {
        type: ActionType.AddHealthPlanToStore,
        payload: healthPlan
    }
}

export const FetchHealthPlanFromDB = (healthPlan) =>{
    return (dispatch)=>{
        axiosInstance.post('/fetchhp', healthPlan, {headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }})
            .then((data)=>{
                console.log("Fetch data: " + JSON.stringify(data.data))
                dispatch(AddHealthPlanToStore(data.data));
                //dispatch(AddUserRoleToStore(data.data.role));
            })
            .catch((error)=>{
                console.log("Error fetching healthplan." + error)

            })
    }
}
