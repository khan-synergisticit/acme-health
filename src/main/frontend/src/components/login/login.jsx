import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { useAuth } from "../../state/auth/useAuth";

export default function LoginComponent({props}){
    const { Login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")

    const handleSubmitEvent = async (e) => {
        e.preventDefault();
        if (username !== "" && password !== "") {
            const login ={
                username,
                password
            }
            await Login(login);
        }
    };

    let handleUsername =(e)=>{
        setUsername(e)
    }

    let handlePassword =(e) =>{
        setPassword(e)
    }

    return (
            <Card className="text-center login-card" >
                <Card.Body>
                    <Row >
                        <Col >
                            <Form.Group className="mb-3" controlId="formBasicUsername">
                                <Form.Label className="col-form-label col-form-label-lg">Username</Form.Label>
                                <Form.Control className="form-control form-control-lg" onChange={(e)=>handleUsername(e.target.value)} type="text" placeholder="Enter Username" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label className="col-form-label col-form-label-lg">Password</Form.Label>
                                <Form.Control className="form-control form-control-lg" type="password" onChange={(e)=>{handlePassword(e.target.value)}} placeholder="Password" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            <Button style={{width: "200px", marginTop:"35px"}} className="mb-6" variant="outline-primary" onClick={(e)=> handleSubmitEvent(e)}>
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
    );
}

