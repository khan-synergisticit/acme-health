import {Navigate} from "react-router-dom";
import { useAuth} from "../../state/auth/useAuth";
import React from "react";


export const AuthenticatedRoute = ({ children }) => {
    const { user } = useAuth();
    if(!user){
        return (
            <Navigate to={"/"}/>
        )
    }
    return children;
};