import React from "react";
import { createContext, useContext, useMemo } from "react";
import { useDispatch} from "react-redux";

import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../localStorage/useLocalStorage";
import {AxiosUsersClient} from "../../utils/axios/axiosState";
import {AddMessageToStore} from "../message/messageAction";

const axiosInstance = AxiosUsersClient();

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useLocalStorage("user", {username:" ",
        role:" ",
        jwt:" ",
        authenticated:" "});
    const [role, setRole] = useLocalStorage("role", "");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const Login = async (login) => {

            axiosInstance.post("/login", login,{headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                }})
                .then((data)=>{

                    if(data.data.authenticationResponse.authenticated){
                        const userData = {
                            username:data.data.authenticationResponse.principal.username,
                            role:data.data.authenticationResponse.authorities[0].authority,
                            jwt:data.data.jwt,
                            authenticated:data.data.authenticationResponse.authenticated
                        }
                        setUser(userData);
                        setRole(data.data.authenticationResponse.authorities[0].authority)
                        dispatch(AddMessageToStore("LOGIN SUCCESS"))
                        //console.log("Login: " )

                    }
                    navigate("/");
                }).catch((error) =>{
                console.log("DB Error: " + error.message)
            })

    };

    const Logout = () => {
        setUser({username:"",
            role:"",
            jwt:"",
            authenticated:""});
        setRole("")
        navigate("/", { replace: true });
        dispatch(AddMessageToStore("LOGGED OUT"))
            axiosInstance.get("/logout", {headers: {
                Authorization: user.jwt,
                    'Content-Type': 'application/json',
                 "Access-Control-Allow-Origin": "*",
                }})
                .then((data)=>{
                    //console.log("Logout: " + JSON.stringify(data));
                }).catch((error)=>{
                console.log("Logout Error: " + JSON.stringify(error))
            })


    };

    const value = useMemo(
        () => ({
            user,
            Login,
            Logout,
            role
        }),
        [user]
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};