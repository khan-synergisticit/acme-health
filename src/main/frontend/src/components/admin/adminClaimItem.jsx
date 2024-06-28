import React, {useState, useEffect} from "react";
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import AdminClaimDocView from "./adminClaimDocView.jsx";
import {useDispatch} from "react-redux";
import { claimStatus } from "../../utils/utils";
import Button    from "react-bootstrap/Button";
import {UpdateClaimStatus} from "../../state/claim/claimAction";
let AdminClaimItem = (props) =>{
    let [claimStats, setClaimState] = useState(claimStatus[0]);
    let claim = props.claim;
    let patient = claim.patient;
    let dispatch = useDispatch();

    let StatusSelect = () =>{
        return(
            <Form.Select style={{fontSize:"15px"}} aria-label="Default select example" defaultValue={claimStats} onChange={(e)=>setClaimState(e.target.value)}>
                {claimStatus.map((stat, index)=> {
                    return (
                      <option  key={index} value={stat} >{stat}</option>
                )
                })}
            </Form.Select>
        )
    }

    let handleStatusChange = () =>{
        dispatch(UpdateClaimStatus(claimStats, claim.claimId, props.jwt))
    }

    return(
        <div>
            <Row>
                <Col>
                    <Form.Text style={{fontSize:"15px"}}>
                        Patient ID: {patient.id}
                    </Form.Text >
                </Col>
                <Col>
                    <Form.Text style={{fontSize:"15px"}}>
                        Claim ID: {claim.claimId}
                    </Form.Text>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Text style={{fontSize:"15px"}}>
                        Patient LN: {patient.lastName}
                    </Form.Text>
                </Col>

                <Col>
                    <Form.Text style={{fontSize:"15px"}} >
                        <Row>
                            <Col>
                                Claim Status:
                            </Col>
                            <Col>
                                <StatusSelect/>
                            </Col>
                            <Col>
                                <Button variant="outline-primary" style={{fontSize:"15px"}} onClick={handleStatusChange}>Update Status</Button>
                            </Col>
                        </Row>
                    </Form.Text>
                </Col>
            </Row>
            <Row>
            <Col>
                <AdminClaimDocView claimStats={claimStats} claim={claim} jwt={props.jwt}/>
            </Col>
            </Row>
        </div>

    )

}

export default AdminClaimItem;