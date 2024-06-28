import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from "react-bootstrap/Container";

import UserSidebarComponent from "../../components/sidebar/userSidebar.jsx";
import AdminPolicyListingComponent from "../../components/admin/adminpolicylisting.jsx";
import {useAuth} from "../../state/auth/useAuth";
import AdminClaimListing from "../../components/admin/adminclaimlisting.jsx";
import {FetchUserFromDB} from "../../state/user/userAction";
import {InvalidToken} from "../../state/action/actionTypes";

let AdminPage = (props) =>{
    let User = useSelector((state) => state.UserReducer.User)
    let tokenValidity = useSelector((state) => state.TokenReducer.tokenValidity)
    const { user, Logout } = useAuth();
    let dispatch = useDispatch();

    useEffect(() => {
        if(User.userName===""){dispatch(FetchUserFromDB(user)) }

    }, []);

    useEffect(() => {
        if(tokenValidity===InvalidToken){Logout()}
    }, [tokenValidity]);
    return(
        <div className="page-content">
            <UserSidebarComponent user={user}></UserSidebarComponent>
            <Col>
                <Container className="plan-container " style={{marginLeft:"32rem", marginTop:"14rem"}}>
                    <Card >
                        <Tabs>
                            <TabList>
                                <Tab style={{fontSize: "20px"}}>Polices</Tab>
                                <Tab style={{fontSize: "20px"}}>Claims</Tab>
                            </TabList>
                            <TabPanel>
                                <AdminPolicyListingComponent user={user}/>
                            </TabPanel>
                            <TabPanel>
                                <AdminClaimListing user={user}/>
                            </TabPanel>
                        </Tabs>
                    </Card>
                </Container>
            </Col>
        </div>
    )
}

export default AdminPage;