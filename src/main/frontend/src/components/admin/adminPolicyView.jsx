import React,{useEffect} from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {UpdatePolicyDocument} from "../../state/Policy/PolicyAction";
import GetFileComponent from "../file/getFile.jsx";

let AdminPolicyViewComponent = (props) =>{
    let policy = props.policy;

    useEffect(()=>{
        props.allDocs(policy.policyDocuments, props.index);
    },[])
    let handleDocumentAccept= async (docType)=>{

        for(let i = 0; i < policy.policyDocuments.length; i++){
            if(policy.policyDocuments[i].type===docType){
                policy.policyDocuments[i].accepted = true;
            }
        }
        let policyDocs = {
            policyId:policy.policyId,
            policyDocuments:policy.policyDocuments
        };

        let res = await UpdatePolicyDocument(policyDocs, props.jwt);
        props.allDocs(policy.policyDocuments, props.index);
        window.location.reload();
    }
    return(
        <div >
                    <Card >
                        <Card.Body>
                            <Card.Title style={{marginTop:"18px"}}>
                                {policy.approved ? <h5>Status:  Approved</h5> : <h5 style={{color:"red"}}>Status:  Approval Pending</h5>}
                            </Card.Title>
                            {policy.policyDocuments.map((doc, index)=>{

                                if(doc.accepted){
                                    return(<div key={index} style={{marginTop:"10px"}}>
                                            <Card.Text>
                                                Type: {doc.type}  - UPLOADED : ACCEPTED
                                            </Card.Text>
                                            <GetFileComponent path={doc.url} />
                                        </div>
                                    )
                                } else if(doc.url !== ""){
                                    return(<div key={index} style={{marginTop:"10px"}}>
                                            <Row>
                                                <Col>
                                            <Card.Text>
                                                Type: {doc.type}  - UPLOADED
                                            </Card.Text>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col className="col-2">
                                            <Button className="btn btn-primary" style={{margin:"10px"}} onClick={()=> handleDocumentAccept(doc.type)}>
                                                Accept
                                            </Button>
                                                </Col>
                                                    <Col className="col-2">
                                            <Button className="btn btn-danger" style={{margin:"10px"}}>
                                                Reject
                                            </Button>
                                                </Col>
                                            </Row>
                                            <GetFileComponent path={doc.url} jwt={props.jwt}/>
                                        </div>
                                    )
                                }else {
                                    return(<div key={index} >
                                        <Card.Text className="font-weight-bold" style={{marginTop:"10px"}}>
                                            Type: {doc.type}  - STILL PENDING
                                        </Card.Text>

                                    </div>)
                                }
                            })}
                        </Card.Body>
                    </Card>
        </div>
    )
}

export  default AdminPolicyViewComponent;