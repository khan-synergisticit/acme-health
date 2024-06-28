import React, { useState } from "react";
import { validateEmail} from "../../utils/utils";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./signup.css"

export default function SignupComponent({props}){
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [confirmpw, setConfirmpw] = useState("");

    let handleSignup=()=>{
        if( password !== confirmpw){
            alert("Password does not match. Please re-enter.")
        } else if( !validateEmail(username)){
            alert("Invalid email. Please re-enter.")
        } else {

        }
    }

    return(
            <Form className="signup-form text-center" style={{backgroundColor:"white"}}>
                <Row >
                    <Col >
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label className="col-form-label col-form-label-lg">Username</Form.Label>
                            <Form.Control onChange={(e)=>setUsername(e.target.value)} className="form-control form-control-lg" type="email" placeholder="Please enter your email" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col >
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className="col-form-label col-form-label-lg">Password</Form.Label>
                            <Form.Control onChange={(e)=> setPassword(e.target.value)} className="form-control form-control-lg" type="password" placeholder="" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col >
                        <Form.Group className="mb-3" controlId="formBasicPassword2">
                            <Form.Label className="col-form-label col-form-label-lg">Confirm password</Form.Label>
                            <Form.Control onChange={(e)=> setConfirmpw(e.target.value)} className="form-control form-control-lg" type="password" placeholder="" />
                        </Form.Group>
                    </Col>
                </Row>

                <Row >

                    <Col className="col-4">
                        <Button variant="outline-primary"  onClick={()=> handleSignup()}>
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Form>
    )
}