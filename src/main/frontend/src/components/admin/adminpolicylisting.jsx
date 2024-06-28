import React, { useEffect, useState } from "react";
import { useAuth } from "../../state/auth/useAuth";
import { useSelector, useDispatch } from "react-redux";
import ListGroup from 'react-bootstrap/ListGroup';
import {FetchNotApprovedPoliciesFromDB, ApprovePolicy, ApprovePolicy2} from "../../state/Policy/PolicyAction";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import AdminPolicyViewComponent from "./adminPolicyView.jsx";
import {SavePolicyTest} from "../../state/Policy/PolicyAction";

let AdminPolicyListingComponent = (props) =>{
    let user = props.user;
    let Policy = useSelector((state)=> state.PolicyReducer.Policy)
    let dispatch = useDispatch();
    let [show, setShow] = useState([]);
    let [policyIsApproved, setPolicyApproved] = useState(false);
    let[policyApproveButton, setPolicyApproveButton] = useState([]);
    let toggleShow = (index) =>{
        show[index] = !show[index];
        setShow([...show])
    }
    //let policies = Policy.policies;
    useEffect(() => {

        dispatch(FetchNotApprovedPoliciesFromDB(user.jwt))}

    , []);

    useEffect(()=>{
        let shows = new Array(Policy.length).fill(false)
        setShow(shows)
        let approve = new Array(Policy.length).fill(false);
        if(Policy && Policy.length > 0){
            Policy.forEach((p, i)=> allDocs(p.policyDocuments, i))
        }
    }, [Policy])

    let handleApprovePolicy = (policyId) =>{
        dispatch(ApprovePolicy(policyId, user.jwt))
    }
    let allDocs=(doc, index)=>{
        let len = doc.length;
        let sum = 0
        for(let i = 0; i < len; i++){
            if(doc[i].accepted){
                sum++;
            }
        }
        if(sum===len){
            policyApproveButton[index] =true;
            setPolicyApproveButton(policyApproveButton);
        }
    }

    // let handleTestDoc = (policy)=>{
    //     dispatch(SavePolicyTest(policy))
    // }
    return(
        <div style={{minWidth:"600px", marginTop:"25px"}}>
            <ListGroup as="ul">
                {Policy && Policy.length > 0 ?  Policy.map((policy, index)=>{
                    return (
                        <ListGroup.Item as="li" key={policy.policyId} style={{marginTop:"10px", marginBottom:"18px"}}>

                            <Card>
                                <Card.Header>Policy ID: {policy.policyId}</Card.Header>
                                <Card.Body>
                                    <Card.Title>{show[index]}Health Plan: {policy.healthPlan.healthPlanName}</Card.Title>
                                    <Card.Title>
                                        <h6>Status: </h6> {policy.approved ? <h6>Approved</h6> : <h6>Approval Pending</h6>}
                                    </Card.Title>
                                    <Row>
                                        <Col className="col-4">
                                            <Button variant="primary" onClick={()=>toggleShow(index)}>View Policy</Button>
                                        </Col>

                                        <Col className="col-1">
                                            <Button variant="danger" >Deny</Button>
                                        </Col>
                                        <Col className="col-6">
                                            {policyApproveButton[index] ? <Button variant="success" id="approveButton" onClick={()=>handleApprovePolicy(policy.policyId)}>Approve</Button> : <h5>Approval will be available when requirements are met.</h5>}
                                        </Col>
                                    </Row>
                                </Card.Body>
                                { show[index] ? <AdminPolicyViewComponent allDocs={allDocs} index={index} policy={policy} jwt={user.jwt}/> : null}
                            </Card>

                        </ListGroup.Item>
                    )
                }) : <ListGroup.Item as="li"><h4>There are no pending policies.</h4></ListGroup.Item>}
            </ListGroup>
        </div>
    )
}

export default AdminPolicyListingComponent;