import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ListGroup from 'react-bootstrap/ListGroup';
import {FetchPoliciesFromDB} from "../../state/Policy/PolicyAction";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UploadComponent from "../file/uploadComponent.jsx";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import PolicyInfoComponent from "./policyInfo.jsx";
import ClaimTab from "../claim/claimTab.jsx";

let PolicyListingComponent = (props) =>{
    let Policy = useSelector((state)=> state.PolicyReducer.Policy)
    let [showDocuments, setShowDocuments] = useState([]);
    let dispatch = useDispatch();

    useEffect(()=>{
        if(Policy && Policy.length > 0 ){
            for(let i = 0; i < Policy.length; i++){
                showDocuments.push(false);
                console.log(i)
            }
            setShowDocuments(showDocuments);
        }
    },[Policy])

    useEffect(() => {
        if(props.policies.length > 0){
            dispatch(FetchPoliciesFromDB({
            jwt:props.user.jwt,
            policies:[...props.policies]
        }))}
    }, []);

    let handleSubmit = (formData) =>{
        formData.append("jwt", props.user.jwt);
    }

    let toggleShowDocuments =(index)=>{
        console.log("index " + index)
        showDocuments[index] = !showDocuments[index];
        setShowDocuments([...showDocuments]);
    }



    return(
        <Row  >
            {Policy && Policy.length > 0 ?  Policy.map((policy, index)=>{
                return (
                   <Col key={index} className="col-12" >
                        <Row >
                            <Card  style={{margin:"3rem"}}>
                                <Card.Header>
                                    <h4>
                                        Policy ID: {policy.policyId}
                                    </h4>
                                </Card.Header>
                                <Tabs>
                                    <TabList>
                                        <Tab>
                                            <h4>Policy</h4>
                                        </Tab>
                                        <Tab>
                                            {policy.approved ? <h4>Claims</h4> : null}
                                        </Tab>
                                    </TabList>
                                    <TabPanel>
                                        <Card.Body>
                                            <Card.Title>Health Plan: {policy.healthPlan.healthPlanName}</Card.Title>
                                            <Card.Title style={{marginTop:"18px"}}>
                                                {policy.approved ? <h5 style={{color:"green"}}>Status:  Approved</h5> : <h5 style={{color:"red"}}>Status:  Approval Pending</h5>}
                                            </Card.Title>
                                            <PolicyInfoComponent policy={policy}/>
                                            {policy.approved ? <Button variant="outline-primary" style={{width:"100px"}} onClick={()=>toggleShowDocuments(index)}>Show Documents</Button> : <Button style={{width:"100px"}} variant="danger" onClick={()=>toggleShowDocuments(index)}>Show Documents</Button>}
                                            {showDocuments[index] ? <UploadComponent approved={policy.approved} documents={policy.policyDocuments} handleSubmit={handleSubmit} policyId={policy.policyId} jwt={props.user.jwt}></UploadComponent> : null}
                                        </Card.Body>
                                        <Card.Body style={{marginTop:"15px"}}>
                                            {/*{policy.approved ? <Button style={{marginTop:"15px", marginBottom:"15px"}} variant="outline-primary" onClick={()=>setShowClaim(!showClaim)}>File a Claim</Button> : null}*/}
                                        </Card.Body>
                                    </TabPanel>
                                    <TabPanel>
                                        <ClaimTab policy={policy} jwt={props.user.jwt}/>
                                    </TabPanel>
                                </Tabs>
                            </Card>
                        </Row>
                   </Col>
                )
            }) : <ListGroup.Item as="li"><h4>You have no policies at the moment.</h4></ListGroup.Item>}
        </Row>
    )
}

export default PolicyListingComponent;