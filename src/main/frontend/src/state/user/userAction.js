import * as ActionType from "../action/actionTypes";
import {AxiosUsersClient} from "../../utils/axios/axiosState";

import { InvalidToken } from "../token/tokenAction";

const axiosInstance = AxiosUsersClient();

export const AddUserToStore = (newUser) => {

    return {
        type: ActionType.AddUserToStore,
        payload: newUser
    }
}

export const UserSignup = async (signup) =>{
    let header = {headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
        }}
    return (dispatch) =>{
        axiosInstance.post("signup", signup, header)
            .then((data)=>{
                console.log("Signup: " + JSON.stringify(data.data))
                return data.data;
            })
            .catch((error) =>{
                console.log("Error: " + error.message)
            })
    }

}

export const FetchUserFromDB = (user) =>{

    console.log("User ID: " + user.username);
    return (dispatch)=>{
        axiosInstance.get("api/user/find?username="+user.username, {
            headers:{Authorization: 'Bearer ' + user.jwt}
        })
            .then((data)=>{

                dispatch(AddUserToStore(data.data));
                //dispatch(AddUserRoleToStore(data.data.role));
            })
            .catch((error)=>{
                if(error.response.status === 404 ){
                    console.log("User not found, saving as new user: " + error)
                } else if(error.response.status === 500 ){

                    console.log("Fetch user from DB Error: " + error);
                    dispatch(InvalidToken())
                }
            })
    }
}
