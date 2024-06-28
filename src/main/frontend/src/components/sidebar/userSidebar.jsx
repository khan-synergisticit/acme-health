import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import "./usersidebar.css"

const UserSidebarComponent = (props) => {
    const user = props.user;
    return(
        <Col className="user-sidebar">
            <Row className="user-sidebar-content">
                <Col id="col">
                <Row style={{marginTop:"5rem"}}>
                    {user.username ? <h3 style={{
                        color: "black",
                        marginTop: "10px",
                        fontWeight: "normal"
                    }}>{user.role} : {user.username}</h3>: null}
                </Row>
                </Col>
            </Row>
        </Col>
    )
}

export default UserSidebarComponent;