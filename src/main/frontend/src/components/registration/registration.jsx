import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate} from "react-router-dom";

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import ShopPlansModalComponent from "../modal/shopPlansModal.jsx";
import {useLocalStorage} from "../../state/localStorage/useLocalStorage";
import {validateEmail2} from "../../utils/utils";

let RegistrationComponent =({plan})=>{
    let HealthPlan = useSelector((state) => state.HealthPlanReducer.HealthPlan);
    let navigate = useNavigate();
    let [numMembers, setNumMembers] = useState(1);
    let [forms, setForms] = useState([])
    let[firstNames, setFirstNames] = useState([])
    let[lastNames, setLastNames] = useState([])
    let[ageList, setAgeList] = useState([])
    let[address, setAddress] = useState("")
    let[city, setCity] = useState("")
    let[state, setState] = useState("")
    let[zip, setZip] = useState("")
    let[email, setEmail]=useState("")
    let[phone, setPhone]= useState("")
    let[policyTotal, setPolicyTotal] = useState(HealthPlan.healthPlanPremium * numMembers)
    const [validated, setValidated] = useState(false);

    const [show, setShow] = useState(false);

    let validateFN = ()=>{
        firstNames.forEach((fn)=>{if(fn===""){
            alert("First name is required")
            return false}})
        return true;
    }

    let validateLN = () => {
        lastNames.forEach((fn)=>{if(fn===""){
            alert("Last name is required.")
            return false}})
        return true;
    }

    let validateAge = () => {
        ageList.forEach((fn)=>{if(fn===""){
            alert("Age is required.")
            return false}})
        return true;
    }

    let validateAddress = () =>{
        if(address==="" ){
            alert("Address is required.")
            return false;
        }
        return true;
    }

    let validateCity = () =>{
        if(city===""){
            alert("City is required.")
            return false;
        }
        return  true;
    }

    let validateState = () =>{
        if (state===""){
            alert("State is required.")
            return false;
        }
        return true;
    }

    let validateZip = () => {
        if(zip===""){
            alert("Zip code is required.")
            return false;
        }
        return true;
    }

    let validatedEmail = () =>{
        if(email===""){
            alert("Email is required.")
            return false;
        } else if(!validateEmail2(email)){
            alert("Valid email is required.")
            return false;
        }
        return true;
    }

    let validatePhone = ()=>{
        if(phone===""){
            alert("Phone number is required.")
            return false;
        }
        return true;
    }
    let validation =(event)=>{

        return  validateAddress()
            && validateCity()
        &&  validateState()
        && validateState()
        && validateZip()
        && validatedEmail()
        && validatePhone()
        && validateAge()
    }

    let CardBody = ()=>{
        return(
            <Row>
                <Col>
                    <Card>
                        <Card.Header ><h4>{HealthPlan.healthPlanName}</h4></Card.Header>
                        <Card.Body>
                            <Card.Title><h5>Level: {HealthPlan.healthPlanMetalLevel}</h5></Card.Title>
                            <Card.Title><h5>Premium: ${HealthPlan.healthPlanPremium}</h5></Card.Title>
                            <Card.Title><h5>Benefit: {HealthPlan.healthPlanBenefit}</h5></Card.Title>
                            <Card.Title><h5>Coverage: {HealthPlan.healthPlanCoverage}</h5></Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        )
    }


    let updateAge=(ages, index)=>{
        ageList[index] = ages;
        setAgeList(ageList)

    }

    let updateFN=(fn, i)=>{
        firstNames[i] = fn;
        setFirstNames(firstNames)
    }

    let updateLN=(ln, i)=>{
        lastNames[i] = ln;
        setLastNames(lastNames)
    }


    let addMembers = (num) =>{
        setNumMembers(num);
        setPolicyTotal(HealthPlan.healthPlanPremium * num)
        setFirstNames(Array(num).fill(""))
        setLastNames(Array(num).fill(""))
        setAgeList(Array(num-1).fill(""))
        let form = []
        for(let i = 0; i < num-1; i++){
            form.push(
                <Row >
                    <Col>
                        <Card key={i}>
                            <Card.Header key={i+1}><h4>Member: {i+1}</h4></Card.Header>
                            <Card.Body key={i}>
                                <Row>
                                    <Form.Group as={Col} className="mb-3" controlId="age" key={i+2}>
                                        <Form.Label className="col-form-label col-form-label-lg">Age:</Form.Label>
                                    </Form.Group>
                                    <Form.Group as={Col} className="mb-3 " controlId="age">
                                        <Form.Control required={true} className="col-form-label-lg" type="date" onChange={(val) => updateAge(val.target.value, i+1)}>
                                        </Form.Control>
                                    </Form.Group>
                                </Row>
                                <Row >
                                    <Col className="col-6">
                                        <Form.Group className="mb-3" controlId="formBasicUsername">
                                            <Form.Label className="col-form-label col-form-label-lg">First Name</Form.Label>
                                            <Form.Control className="form-control form-control-lg" type="text" placeholder="" onChange={(val)=> updateFN(val.target.value, i+1)}/>

                                        </Form.Group>
                                    </Col>
                                    <Col className="col-6">
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label className="col-form-label col-form-label-lg">Last Name</Form.Label>
                                            <Form.Control className="form-control form-control-lg" type="text" placeholder="" onChange={(val)=> updateLN(val.target.value, i+1)}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )
        }
        setForms(form);
    }

    let NoOfMembers = (e) =>{
        return (
            <div className="align-content-center">
                <Row>
                    <Col>
                        <Form.Group  className="mb-3" controlId="numMembersControl">
                            <label className="col-form-label col-form-label-lg">Total Number of Members:</label>
                        </Form.Group>
                        <Form.Group  className="col-3 mb-3 " controlId="numMembersControl">
                            <Form.Control  className="col-form-label-lg" type="number" placeholder={numMembers} onChange={(val) => val.target.value.length === 0? null: addMembers(val.target.value)}>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
            </div>
        )
    }

    let handleEnroll = (e)=>{

        if(validation(e)){
            let dependents = [];
            for(let i = 1; i <numMembers; i++){
                let d ={
                    "firstName":firstNames[i],
                    "lastName":lastNames[i],
                    "birthDate":ageList[i]
                }
                dependents.push(d);
            }
            let addy = {
                "street":address,
                "city":city,
                "state":state,
                "postalCode":zip
            }
            let member = {
                "firstName":firstNames[0],
                "lastName":lastNames[0],
                "birthDate":ageList[0],
                "address":addy,
                "email":email,
                "phoneNumber":phone,
                "isPrimary":true,
                "dependents": dependents
            }


            let registrationDetails = {
                "member":member,
                "healthPlanId":HealthPlan.healthPlanId,
                "totalPremium": policyTotal
            }

            window.localStorage.setItem("policy", JSON.stringify(registrationDetails))
            navigate("/checkout", {state:{ id:HealthPlan.healthPlanId, amount:policyTotal, email:email}})
        }

    }

    let handleCloseModal = ()=>{
        setShow(false);
    }


    return(
        <div style={{backgroundColor:"white"}}>
            { show ? <ShopPlansModalComponent show={show} handleCloseModal={handleCloseModal} handleEnroll={(e)=>handleEnroll(e)} policyTotal={policyTotal}/> : null}
            <Form noValidate validated={validated} onSubmit={(e)=> {e.preventDefault(); setShow(true)}}>

                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <h3>Registration</h3>
                        </Form.Group>
                    </Col>
                </Row>

                {HealthPlan.healthPlanPremium > 0 ? <CardBody/> : null}
                <Row>
                    <Col className="col-5">
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label className="col-form-label col-form-label-lg">First Name</Form.Label>
                            <Form.Control required  className="form-control form-control-lg" type="text" placeholder=""
                                          onChange={(val) => updateFN(val.target.value, 0)}/>
                            <Form.Control.Feedback type="invalid">First name is required.</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col className="col-5">
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className="col-form-label col-form-label-lg">Last Name</Form.Label>
                            <Form.Control className="form-control form-control-lg" type="text" placeholder=""
                                          onChange={(val) => updateLN(val.target.value, 0)}/>
                        </Form.Group>
                    </Col>
                    <Col className="col-2">
                        <Form.Group className="mb-3" controlId="age">
                            <Form.Label className="col-form-label col-form-label-lg">Age:</Form.Label>
                            <Form.Control required={true} className="col-form-label-lg" type="date"
                                          onChange={(val) => updateAge(val.target.value, 0)}>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className="col-form-label col-form-label-lg">Address</Form.Label>
                            <Form.Control className="form-control form-control-lg" type="text" placeholder=""
                                          onChange={(val) => setAddress(val.target.value)}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col className="col-6">
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label className="col-form-label col-form-label-lg">City</Form.Label>
                            <Form.Control className="form-control form-control-lg" type="text" placeholder=""
                                          onChange={(val) => setCity(val.target.value)}/>

                        </Form.Group>
                    </Col>
                    <Col className="col-4">
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className="col-form-label col-form-label-lg">State</Form.Label>
                            <Form.Control className="form-control form-control-lg" type="text" placeholder=""
                                          onChange={(val) => setState(val.target.value)}/>
                        </Form.Group>
                    </Col>
                    <Col className="col-2">
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className="col-form-label col-form-label-lg">Zip Code</Form.Label>
                            <Form.Control className="form-control form-control-lg" type="text" placeholder=""
                                          onChange={(val) => setZip(val.target.value)}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col className="col-7">
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label className="col-form-label col-form-label-lg">Email</Form.Label>
                            <Form.Control className="form-control form-control-lg" type="text" placeholder=""
                                          onChange={(val) => setEmail(val.target.value)}/>

                        </Form.Group>
                    </Col>
                    <Col className="col-5">
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className="col-form-label col-form-label-lg">Phone</Form.Label>
                            <Form.Control className="form-control form-control-lg" type="text" placeholder=""
                                          onChange={(val) => setPhone(val.target.value)}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Col>
                    {HealthPlan.healthPlanCoverage === "Small Group" ? <NoOfMembers/> : null}
                    {numMembers > 1 ? forms.map((form) => {
                        return form
                    }) : null}
                </Col>
                <Row style={{marginTop: "25px", marginBottom: "25px"}}>
                    <Col>
                        <Button size="lg" variant="primary" type="submit">Enroll</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )

}

export default RegistrationComponent;