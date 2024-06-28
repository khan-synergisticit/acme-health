import React from "react";
import Nav from "react-bootstrap/Nav";
import { useAuth } from "../../state/auth/useAuth";


let LogoutComponent = () =>{

    const { Logout } = useAuth();

    const handleLogout = (e)=>{
        Logout();
    }

    return(
        <Nav.Link variant="primary" size="lg" onClick={()=> handleLogout()}>
            Logout
        </Nav.Link>
    )
}

export default LogoutComponent;