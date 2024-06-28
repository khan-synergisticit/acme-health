import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {AddHealthPlanToStore} from "../../state/healthplan/healthPlanAction";

let PlanListingComponent = ({listing}) => {
    let dispatch = useDispatch();
    const navigate = useNavigate();

    let choosePlan =(plan)=>{
        dispatch(AddHealthPlanToStore(plan));
        navigate('/registration');
    }

    return(
        <Row >
            {listing.length > 0 ? listing.map((list) => {
                return <Col className="col-4">
                    <Card className="plan-row">
                        <Card.Header ><h4>{list.healthPlanName}</h4></Card.Header>
                        <Card.Body>
                            <Card.Title><h5>Level: {list.healthPlanMetalLevel}</h5></Card.Title>
                            <Card.Title><h5>Premium: ${list.healthPlanPremium}</h5></Card.Title>
                            <Card.Title><h5>Benefit: {list.healthPlanBenefit}</h5></Card.Title>
                            <Card.Title><h5>Coverage: {list.healthPlanCoverage}</h5></Card.Title>
                            <Button size="lg" variant="outline-primary" onClick={() => choosePlan(list)}>Choose</Button>
                        </Card.Body>
                    </Card>
                </Col>
            }) : null}
        </Row>
    )
}

export default PlanListingComponent;