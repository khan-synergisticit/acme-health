import React , { useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from "react-bootstrap/Button";

import ClaimComponent from "./claimComponent.jsx";
import {FetchClaimFromDBById} from "../../state/claim/claimAction";
import ClaimInfoComponent from "./claimInfo.jsx";


let ClaimTab = (props)=>{
    let claims = useSelector((state)=> state.ClaimReducer.Claim)
    let [showClaim, setShowClaim] = useState(false)
    let policy = props.policy
    let dispatch = useDispatch();

    useEffect(()=>{
        let c = {
            policyId:policy.policyId,
            jwt:props.jwt
        }
        dispatch(FetchClaimFromDBById(c))

    },[])
    console.log("claims: " + JSON.stringify(claims))
    return(<>
            <div>
                <Card.Body>
                    <Card.Title>
                        <ListGroup>
                            {claims.length > 0 ? claims.map((claim, index)=>{
                                return <ListGroup.Item key={index}>
                                    <ClaimInfoComponent claim={claim} jwt={props.jwt}/>
                                </ListGroup.Item>
                                })
                                : <ListGroup.Item>You have no claims.</ListGroup.Item>}
                        </ListGroup>
                    </Card.Title>
                </Card.Body>
                <Card.Body>
                    <Row>
                        <Col>
                            <Button style={{width:"100px"}} variant="primary" onClick={() => setShowClaim(!showClaim)}>File a Claim</Button>
                        </Col>
                    </Row>
                </Card.Body>
                <Card.Body>
                    {showClaim ? <ClaimComponent policy={policy}/> : null}
                </Card.Body>
            </div>
    </>)
}

export default ClaimTab;