import * as ActionType from "../action/actionTypes";
import {AxiosUsersClient} from "../../utils/axios/axiosState";
import axios from "axios";
import {AddMessageToStore} from "../message/messageAction";


const axiosInstance = AxiosUsersClient();

export const AddPolicyToStore = (policy) => {
    return {
        type: ActionType.AddPolicyToStore,
        payload: policy
    }
}

export const SavePolicyTest = (policy) =>{
    return (dispatch)=>{
        axiosInstance.put('/testDoc', policy, {headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }})
            .then((data)=>{
                console.log("Test policy to DB: " + JSON.stringify(data.data))

            })
            .catch((error)=>{
                console.log("Error saving policy." + error)
            })
    }
}

export const SavePolicyToDB = (policy) =>{
    console.log("policy: " + JSON.stringify(policy))
    return (dispatch)=>{
        axiosInstance.put('/savePolicy', policy, {headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }})
            .then((data)=>{
                console.log("Saved policy to DB: " + JSON.stringify(data.data))
                dispatch(AddPolicyToStore(data.data));
            })
            .catch((error)=>{
                console.log("Error saving policy." + error)
            })
    }
}

export const ApprovePolicy =  (id, jwt) => {
    let header = {
        Authorization: 'Bearer ' + jwt,
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
    }
    return (dispatch)=>{
        axiosInstance.get('/api/policy/approve?id='+id, {headers: header})
            .then((data)=>{
                if(data.status ===200){
                    dispatch(AddPolicyToStore(data.data))
                    dispatch(AddMessageToStore("Policy Approved"))
                }
            })
            .catch((error)=>{
                console.log("Error saving policy." + error)
            })

    }

}

export const ApprovePolicy2 = async (id, jwt) => {
    let header = {
        Authorization: 'Bearer ' + jwt,
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
    }

    const res = await fetch("http://localhost:3002/api/policy/approve?id="+id,{
        method:"GET",
        mode:"cors",
        headers:header,
        //body: JSON.stringify(policyDocs)

    })
    return res.json();

}

export const FetchPoliciesFromDB = (policies) =>{
    return (dispatch)=>{
        axiosInstance.post('/api/policy/findByIds', policies.policies, {headers: {
                Authorization: 'Bearer ' + policies.jwt,
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }})
            .then((data)=>{
                //console.log(JSON.stringify(data.data))
                dispatch(AddPolicyToStore(data.data));
                //
            })
            .catch((error)=>{
                console.log("Error fetching policy." + error)

            })
    }
}

export const UpdatePolicyDocument  =(policyDocs, jwt) =>{

    const headers= {
        Authorization: 'Bearer ' + jwt,
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
    }

    return (dispatch)=>{
        axiosInstance.post('/api/policy/updateDocument', policyDocs, {headers: headers})
            .then((data)=>{
                dispatch(AddPolicyToStore(data.data));
            })
            .catch((error)=>{
                console.log("Error updating policy." + error)

            })
    }

}

export const UpdatePolicyDocument2 = async  (policyDocs, jwt) =>{

    const headers = {
        Authorization: 'Bearer ' + jwt,
        'Content-Type': 'application/json',

    }
    const res = await fetch("http://localhost:4242/api/policy/updateDocument",{
        method:"POST",
        mode:"cors",
        headers:headers,
        body: JSON.stringify(policyDocs)

    })
    return res.json();

}

export const UploadPolicyDocuments = async (formData, jwt) =>{
    const headers = {
        Authorization: 'Bearer ' + jwt,
        'content-type': 'multipart/form-data',
        "Access-Control-Allow-Origin": "*",
    }


    axios({url:"http://localhost:3002/api/fileUpload/", data:formData, headers:headers, method:"post"})

        .then((data)=>{
            console.log("File upload success: " + JSON.stringify(data.data))

            return true;
        })
        .catch((error)=>{
            console.log("Error fetching policy." + error)

        })

}


export const FetchNotApprovedPoliciesFromDB = (jwt) =>{
    return (dispatch)=>{
        axiosInstance.get('/api/policy/findUnapproved', {headers: {
                Authorization: 'Bearer ' + jwt,
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }})
            .then((data)=>{
                //console.log(JSON.stringify(data.data))
                dispatch(AddPolicyToStore(data.data));
                //
            })
            .catch((error)=>{
                console.log("Error fetching policy." + error)
                if(error.response.status === 500){
                    window.location.replace("/")
                }

            })
    }
}


