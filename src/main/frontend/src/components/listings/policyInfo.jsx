import React from 'react';
import Card from "react-bootstrap/Card";


let PolicyInfoComponent = (props) =>{
    let policy = props.policy;
    let primaryCareProvider = policy.primaryCareProvider;
    return(
        <div>
            <Card.Body>
                <Card.Title>Primary Healthcare Provider: {primaryCareProvider.networkProviderLastName}, {primaryCareProvider.networkProviderFirstName}</Card.Title>
                <Card.Title >Formulary ID: {policy.healthPlan.healthPlanFormulary}</Card.Title>
            </Card.Body>
        </div>
    )
}

export default PolicyInfoComponent;