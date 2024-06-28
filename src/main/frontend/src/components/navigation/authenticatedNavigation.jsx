import React from "react";
import Nav from "react-bootstrap/Nav";
import {useAuth} from "../../state/auth/useAuth";

let AuthenticatedNavigation = ({children}) =>{
    const { user } = useAuth();

    if(user.username.length===0){
        return (
            <>
                <Nav.Link  href="/login">Login</Nav.Link>
                <Nav.Link href="/signup">Signup</Nav.Link>
            </>
        )
    }

    return children ;
}

export default AuthenticatedNavigation;