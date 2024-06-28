import * as ActionType from "../action/actionTypes";
import {AxiosUsersClient} from "../../utils/axios/axiosState";
import {AddMessageToStore} from "../message/messageAction";


const axiosInstance = AxiosUsersClient();

export  const AddClaimToStore = (claim)=>{
    return{
        type:ActionType.AddClaimToStore,
        payload:claim
    }
}


export const SaveClaimToDB = (claim) => {
    return (dispatch)=>{
        axiosInstance.post('/api/claim/saveClaim', claim.claimForm, {headers: {
                Authorization: 'Bearer ' + claim.jwt,
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }})
            .then((data)=>{
                dispatch(AddMessageToStore("CLAIM SUBMITTED"))
                dispatch(AddClaimToStore(data.data));
                return data.status;
            })
            .catch((error)=>{
                console.log("Error saving claim." + error)
            })
    }
}

export const FetchClaimFromDBById =  (claim) =>{
    return (dispatch)=>{
        axiosInstance.get('/api/claim/findById?id='+claim.policyId, {headers: {
                Authorization: 'Bearer ' + claim.jwt,
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }})
            .then((data)=>{
                //console.log("Fetch claim from db: " + JSON.stringify(data.data))
                dispatch(AddClaimToStore(data.data));
            })
            .catch((error)=>{
                console.log("Error saving claim." + error)
            })
    }
}

export const UpdateClaimStatus =  (status, claimId, jwt) =>{
    return (dispatch)=>{
        axiosInstance.get('/api/claim/updateStatus?status='+status+"&claimId="+claimId, {headers: {
                Authorization: 'Bearer ' + jwt,
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }})
            .then((data)=>{
                console.log("Update claim: " + JSON.stringify(data.data))
                dispatch(AddClaimToStore(data.data));
            })
            .catch((error)=>{
                console.log("Error saving claim." + error)
            })
    }
}

export const UpdateClaimDocs =  (docs, jwt) =>{
    return (dispatch)=>{
        axiosInstance.post('/api/claim/update', docs, {headers: {
                Authorization: 'Bearer ' + jwt,
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }})
            .then((data)=>{
                console.log("Update claim: " + JSON.stringify(data.data))
                dispatch(AddClaimToStore(data.data));
            })
            .catch((error)=>{
                console.log("Error saving claim." + error)
            })
    }
}

export const FetchClaimFromDBByStatus =  (claim) =>{
    return (dispatch)=>{
        axiosInstance.post('/api/claim/findByStatus', claim.page, {headers: {
                Authorization: 'Bearer ' + claim.jwt,
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }})
            .then((data)=>{
                console.log("Fetch claim from db by status: " + JSON.stringify(data.data))
                dispatch(AddClaimToStore(data.data));
            })
            .catch((error)=>{
                console.log("Error saving claim." + error)
            })
    }
}



export const FetchClaimByStatus =  (status, jwt) =>{
    return (dispatch)=>{
        axiosInstance.get('/api/claim/findByStatus?status='+status, {headers: {
                Authorization: 'Bearer ' + jwt,
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }})
            .then((data)=>{
                console.log("Fetch claim from db bystatus: " + JSON.stringify(data.data))
                dispatch(AddClaimToStore(data.data));
            })
            .catch((error)=>{
                console.log("Error saving claim." + error)
            })
    }
}

