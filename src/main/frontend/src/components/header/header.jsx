import React from "react";
import {Navbar} from "react-bootstrap";
import {Container} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";

import {useAuth} from "../../state/auth/useAuth";
import AuthenticatedNavigation from "../navigation/authenticatedNavigation.jsx";
import LogoutComponent from "../logout/logout.jsx";
import AdminNav from "../navigation/adminNav.jsx";

import "./header.css"

export default function HeaderComponent({props}){
    let { user } = useAuth();
    return(
        <div >
            <Navbar className="top-bar navbar-custom " fixed="top">
                <Container className="navbar-header justify-content-lg-start" style={{marginTop: 25, marginLeft: 20}}>
                    <Navbar.Brand className="navbar-brand" href="/">ACME <span>Insurance</span>
                    </Navbar.Brand>
                </Container>

                <Container className="collapse navbar-collapse navbar-main-collapse">
                    <Nav className="nav navbar-nav navbar-right">
                        <AdminNav>
                            <Nav.Link href="/admin">Admin</Nav.Link>
                        </AdminNav>
                        <AuthenticatedNavigation>
                            <LogoutComponent />
                            <Nav.Link  href="/user">User</Nav.Link>
                        </AuthenticatedNavigation>
                        <Nav.Link className="btn-default" href="/search">Shop Plans</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}