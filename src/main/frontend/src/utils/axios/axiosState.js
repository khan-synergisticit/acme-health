import axios from "axios";
import { parse, stringify } from 'qs'

// export const AxiosState = () =>{
//     return axios.create({baseURL: "http://localhost:8100/"});
// }

export const  AxiosUsersClient = () => {
    return axios.create({baseURL: "http://localhost:4242/",  paramsSerializer: {
            encode: parse,
            serialize: stringify,
        }, });
}

export const  AxiosPolicyClient = () => {
    return axios.create({baseURL: "http://localhost:8200/",  paramsSerializer: {
            encode: parse,
            serialize: stringify,
        }});
}

