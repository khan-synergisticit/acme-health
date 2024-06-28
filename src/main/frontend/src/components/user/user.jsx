import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchUserFromDB} from "../../state/user/userAction";
import PolicyListingComponent from "../listings/policyListing.jsx";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {Container} from "react-bootstrap";

let UserComponent = (props) =>{
    let User = useSelector((state) => state.UserReducer.User)
    let dispatch = useDispatch();
    const user = props.user;

    useEffect(() => {
        if(User.userName===""){dispatch(FetchUserFromDB(user)) }
    }, []);

    let UserDetails = ()=>{
        return (
            <Container className="plan-container " style={{marginLeft:"33rem", marginTop:"12rem"}}>
                <Row>
                    <PolicyListingComponent policies={User.policies} user={user} />
                </Row>
            </Container>
        )
    }
    return (
        <Col >
            {User !== undefined ? <UserDetails/>: <h6>No user data at this time. </h6>}
        </Col>
    )
}

export default UserComponent;