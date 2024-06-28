import React, {useState} from "react";

import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';

import ClaimDocumentUpload from "../file/claimDocumentUpload.jsx";

import {currencyFormatter} from "../../utils/utils";

let ClaimInfoComponent = (props) =>{
    let claim = props.claim;
    let[showTodos, setShow] = useState(false)

    return(
        <div>
            <Card.Body>
                <Card.Title>
                    Claim ID: {claim.claimId}
                </Card.Title>
                <Card.Title>
                    Claim Status: {claim.claimStatus}
                </Card.Title>
                <Card.Title>
                    Claim Total: ${currencyFormatter.format(claim.claimCharge.totalCost)}
                </Card.Title>
                <div style={{marginTop:"20px"}}>
                    {claim.claimStatus==="APPROVED" ? <Button size="lg" style={{width:"100px"}} variant="outline-primary" onClick={()=>setShow(!showTodos)}>To Do</Button> : <Button size="lg" style={{width:"100px"}} variant="outline-danger" onClick={()=>setShow(!showTodos)}>To Do</Button>}
                </div>
            </Card.Body>
            <Card.Body>
                {showTodos ? <ClaimDocumentUpload claim={claim} jwt={props.jwt}/>: null}
            </Card.Body>
        </div>
    )
}

export default ClaimInfoComponent;