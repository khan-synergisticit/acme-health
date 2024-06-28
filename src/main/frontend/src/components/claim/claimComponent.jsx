import React, {useState} from "react";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ProviderDetailsComponent from "./providerDetailsComponent.jsx";

let ClaimComponent = (props) =>{
    let policy = props.policy;
    let member = policy.member;
    let addy = member.address
    let[firstNames, setFirstNames] = useState(member.firstName)
    let[lastNames, setLastNames] = useState(member.lastName)
    let[ageList, setAgeList] = useState(member.birthDate)
    let[address, setAddress] = useState(addy.street)
    let[city, setCity] = useState(addy.city)
    let[state, setState] = useState(addy.state)
    let[zip, setZip] = useState(addy.postalCode)
    let[email, setEmail]=useState(member.email)
    let[phone, setPhone]= useState(member.phoneNumber)
    let [isPrimaryCare, setIsPrimaryCare] = useState(true);
    let [showProvider, setShowProvider] = useState(false)
    let [claimType, setClaimType] = useState("POST_SERVICE")

    let handleShowProvider =(e)=>{
        setShowProvider(false);
        setIsPrimaryCare(e);
        setShowProvider(true);
    }



    return (
        <div className="container">
            <Form className="col">
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <h3>Claim Form</h3>
                        </Form.Group>
                    </Col>
                    <Col className="float-end">
                        <Form.Label style={{fontSize: "20px"}}>Claim Type</Form.Label>
                        <Form.Select size="lg" onChange={(e) => setClaimType(e.target.value)}>
                            <option>Open this select menu</option>
                            <option value="URGENT_CARE">URGENT_CARE</option>
                            <option value="PRE_SERVICE">PRE_SERVICE</option>
                            <option value="POST_SERVICE">POST_SERVICE</option>
                            <option value="SUPPLIES">SUPPLIES</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Row>
                    <Col className="col-5">
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label className="col-form-label col-form-label-lg">First Name</Form.Label>
                            <Form.Control readOnly defaultValue={firstNames} className="form-control form-control-lg"
                                          type="text" placeholder=""
                                          onChange={(val) => setFirstNames(val.target.value)}/>
                            <Form.Control.Feedback type="invalid">First name is required.</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col className="col-5">
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className="col-form-label col-form-label-lg">Last Name</Form.Label>
                            <Form.Control className="form-control form-control-lg" type="text" readOnly
                                          defaultValue={lastNames}
                                          onChange={(val) => setLastNames(val.target.value)}/>
                        </Form.Group>
                    </Col>
                    <Col className="col-2">
                        <Form.Group className="mb-3" controlId="age">
                            <Form.Label className="col-form-label col-form-label-lg">Age:</Form.Label>

                            <Form.Control required={true} className="col-form-label-lg" type="date" readOnly
                                          defaultValue={ageList}
                                          onChange={(val) => setAgeList(val.target.value)}>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className="col-form-label col-form-label-lg">Address</Form.Label>
                            <Form.Control className="form-control form-control-lg" type="text" readOnly
                                          defaultValue={address}
                                          onChange={(val) => setAddress(val.target.value)}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col className="col-6">
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label className="col-form-label col-form-label-lg">City</Form.Label>
                            <Form.Control className="form-control form-control-lg" type="text" readOnly
                                          defaultValue={city}
                                          onChange={(val) => setCity(val.target.value)}/>

                        </Form.Group>
                    </Col>
                    <Col className="col-4">
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className="col-form-label col-form-label-lg">State</Form.Label>
                            <Form.Control className="form-control form-control-lg" type="text" readOnly
                                          defaultValue={state}
                                          onChange={(val) => setState(val.target.value)}/>
                        </Form.Group>
                    </Col>
                    <Col className="col-2">
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className="col-form-label col-form-label-lg">Zip Code</Form.Label>
                            <Form.Control className="form-control form-control-lg" type="text" readOnly
                                          defaultValue={zip}
                                          onChange={(val) => setZip(val.target.value)}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col className="col-7">
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label className="col-form-label col-form-label-lg">Email</Form.Label>
                            <Form.Control className="form-control form-control-lg" type="text" readOnly
                                          defaultValue={email}
                                          onChange={(val) => setEmail(val.target.value)}/>

                        </Form.Group>
                    </Col>
                    <Col className="col-5">
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className="col-form-label col-form-label-lg">Phone</Form.Label>
                            <Form.Control className="form-control form-control-lg" type="text" readOnly
                                          defaultValue={phone}
                                          onChange={(val) => setPhone(val.target.value)}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h5>
                            Is the claim regarding your primary care provider?
                        </h5>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formType">
                            <Form.Label className="col-form-label col-form-label-lg"></Form.Label>
                            <Form.Check className="col-form-label col-form-label-lg" style={{marginRight: 10}}
                                        inline
                                        label="YES"
                                        name="group1"
                                        type="radio"
                                        id="isPrimaryProvider"
                                        onClick={() => handleShowProvider(true)}
                            />
                            <Form.Check className="col-form-label col-form-label-lg"
                                        inline
                                        label="NO"
                                        name="group1"
                                        type="radio"
                                        id="isNotPrimaryProvider"
                                        onClick={() => handleShowProvider(false)}
                            />
                        </Form.Group>
                    </Col>
                </Row>

            </Form>
            {showProvider ?
                <ProviderDetailsComponent claimType={claimType} policy={props.policy} isProvider={isPrimaryCare}
                                          provider={policy.primaryCareProvider}/> : null}
        </div>
    )
}

export default ClaimComponent;