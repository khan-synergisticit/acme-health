import React, {useEffect} from "react";

import Row from 'react-bootstrap/Row';

import {useAuth} from "../../state/auth/useAuth";
import UserComponent from "../../components/user/user.jsx";
import UserSidebarComponent from "../../components/sidebar/userSidebar.jsx";
import {useSelector} from "react-redux";
import {InvalidToken} from "../../state/action/actionTypes";


export default function UserPage({props}){
    let {user, Logout } = useAuth();
    let tokenValidity = useSelector((state) => state.TokenReducer.tokenValidity)

    useEffect(() => {
        if(tokenValidity===InvalidToken){Logout()}
    }, [tokenValidity]);

    return(
        <div>
            <Row >
                <UserSidebarComponent user={user}/>
                <UserComponent user={user}/>
            </Row>
        </div>
    )
}