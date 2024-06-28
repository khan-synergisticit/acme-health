import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchHealthPlanFromDB } from "../../state/healthplan/healthPlanAction";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Container} from "react-bootstrap";
import PlanListingComponent from "../listings/planListing.jsx";
import "./sidebar.css"


let ShopPlansComponent =({props})=>{
    let [coverage, setCoverage ] = useState("Individual")
    let [showNum, setShowNum] = useState(false);

    let [planType, setPlanType] = useState("");
    let [metalType, setMetalType] = useState("");
    let [age, setAge] = useState("");
    let [premium, setPremium] = useState("");
    let dispatch = useDispatch();
    let HealthPlan = useSelector((state) => state.HealthPlanReducer.HealthPlan);

    let singleChange = (event)=>{
        setCoverage("Individual")
        setShowNum(false);
    }
    let groupChange = (event) =>{
        setCoverage("Small Group")
    }

    const isPremiumValid=()=>{
        if(premium===""){
            alert("Premium is required")
            return false;
        }else{
            return true;
        }
    }
    const isAgeValid=()=>{
        if(age===""){
            alert("Age is required")
            return false;
        }else{
            return true;
        }
    }


    const isMetalValid=()=>{
        if(metalType===""){
            alert("Level Type is Required.")
            return false;
        }
        return true;
    }

    let validate = ()=>{

        return isMetalValid() && isPremiumValid() && isAgeValid();
    }

    let queryHP=()=>{
        if(validate()){
            let query = {
                "metalType": metalType,
                "age": age,
                "premium": premium,
                "coverage": coverage
            }

            console.log("Query: " + JSON.stringify(query))
            dispatch(FetchHealthPlanFromDB(query));
        }
    }

    return(
            <div >
                <Row >
                <Col className="sidebar" >
                    <Row className="sidebar-content"  >
                        <Col id="col">
                            <Row className="text-center" style={{marginTop:"8rem"}} >
                                <Row >
                                    <h2>SHOP PLANS</h2>
                                </Row>
                                <Row>
                                    <Col >
                                        <Form.Group className="fmb-3" >
                                            <Form.Label style={{fontSize:"15px"}} className="col-form-label col-form-label-lg">Level</Form.Label>
                                            <Form.Select style={{fontSize:"15px"}} size="lg" aria-label="Default select example"
                                                         onChange={(val) => setMetalType(val.target.value)}>
                                                <option>SELECT</option>
                                                <option value="BRONZE">BRONZE</option>
                                                <option value="SILVER">SILVER</option>
                                                <option value="GOLD">GOLD</option>
                                                <option value="PLATINUM">PLATINUM</option>
                                                <option value="CATASTROPHIC">CATASTROPHIC</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formType" defaultValue={coverage}>
                                                <Form.Label  style={{fontSize:"15px"}} className="col-form-label col-form-label-lg" ></Form.Label>
                                                <Form.Check  className="col-form-label col-form-label-lg" style={{marginRight:"10px",marginTop:"10px", fontSize:"15px"}}
                                                             inline
                                                             value="Individual"
                                                             checked={coverage==="Individual"}
                                                             label="Individual"
                                                             name="group1"
                                                             type="radio"
                                                             id="single"
                                                             onChange={singleChange}
                                                />
                                                <Form.Check  className="col-form-label col-form-label-lg" style={{marginRight:"10px",marginTop:"10px", fontSize:"15px"}}
                                                             inline
                                                             checked={coverage==="Family"}
                                                             value="Family"
                                                             label="Family"
                                                             name="group1"
                                                             type="radio"
                                                             id="family"
                                                             onChange={groupChange}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Row>

                                <Row>
                                    <Row>
                                        <Form.Group as={Col} className="mb-3" controlId="premium">
                                            <Form.Label style={{fontSize:"15px"}} className="col-form-label col-form-label-lg">Premium:</Form.Label>
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} className="mb-3 " controlId="premium">
                                            <Form.Control style={{fontSize:"15px"}} required={true} className="col-form-label-lg" type="number" onChange={(val) => setPremium(val.target.value)}>
                                            </Form.Control>
                                        </Form.Group>
                                    </Row>
                                </Row>
                                <Row>
                                    <Row>
                                        <Form.Group className="mb-3" controlId="age">
                                            <Form.Label style={{fontSize:"15px"}} className="col-form-label col-form-label-lg">Age:</Form.Label>
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group  className="mb-3 " controlId="age">
                                            <Form.Control style={{fontSize:"15px"}} required={true} className="col-form-label-lg" type="number" onChange={(val) => setAge(val.target.value)}>
                                            </Form.Control>
                                        </Form.Group>
                                    </Row>
                                </Row>

                                <Row>
                                    <Col className="col-4">
                                        <Button className="mb-6" size="lg" variant="primary" type="button" onClick={()=>queryHP()}>
                                            SEARCH
                                        </Button>
                                    </Col>
                                </Row>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                    <Col >
                        <Container  style={{marginLeft:"32rem", marginTop:"14rem"}}>
                            <Row>
                                {HealthPlan.length > 0 ? <PlanListingComponent listing={HealthPlan} /> : null}
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </div>
    )
}

export default ShopPlansComponent;