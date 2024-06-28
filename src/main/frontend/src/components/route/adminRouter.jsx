import { Navigate} from "react-router-dom";
import { useAuth} from "../../state/auth/useAuth";
import React from "react";


export const AdminRouter = ({ children }) => {
    const { role } = useAuth();
    if(!(role==="ADMIN")){
        return (
            <Navigate to={"/"}/>
        )
    }
    return children;
};