import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import {FetchClaimByStatus} from "../../state/claim/claimAction";
import { claimStatus } from "../../utils/utils";
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Form from "react-bootstrap/Form"
import Col from 'react-bootstrap/Col'
import {ListGroupItem} from "react-bootstrap";
import AdminClaimItem from "./adminClaimItem.jsx";
import Row from "react-bootstrap/Row";

let AdminClaimListing = (props) =>{
    let user = props.user;
    let claims = useSelector((state) => state.ClaimReducer.Claim);
    let [claimStats, setClaimState] = useState(claimStatus[0]);
    let dispatch = useDispatch();
    useEffect(()=>{
        dispatch(FetchClaimByStatus(claimStats, user.jwt))
    },[])
    console.log(JSON.stringify(claims))

    let handleClaimStatus = (e)=>{
        e.preventDefault();
        dispatch(FetchClaimByStatus(e.target.value, user.jwt))
        setClaimState(e.target.value)
    }
    return(
        <div>
            <Card style={{padding:"10px"}}>
                <Row style={{marginTop:"10px", marginBottom:"10px"}}>
                    <Col className="col-3" >
                        <h4>Select Claim Status</h4>
                        <Form.Select size="lg" onChange={(e)=>{handleClaimStatus(e)}}>
                            <option value={claimStatus[0]}>SUBMITTED</option>
                            <option value={claimStatus[1]}>PROCESSING</option>
                            <option value={claimStatus[2]}>APPROVED</option>
                            <option value={claimStatus[3]}>REJECTED</option>
                            <option value={claimStatus[4]}>APPEAL</option>
                        </Form.Select>
                    </Col>
                </Row>
                <ListGroup>
                {claims && claims.length > 0 ? claims.map((claim, index)=>{
                        return(
                            <ListGroupItem key={index}>
                                <Card.Body>
                                    <AdminClaimItem claim={claim} jwt={user.jwt}/>

                                </Card.Body>
                            </ListGroupItem>
                        )
                    }): <Form.Text style={{fontSize:"15px"}}>There are no claims for: {claimStats}</Form.Text>}
                </ListGroup>
            </Card>
        </div>
    )
}

export default AdminClaimListing;