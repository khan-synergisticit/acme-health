import React, { useState } from "react";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import ClaimItemDetailsComponent from "./claimItemDetails.jsx";

let ProviderDetailsComponent = (props)=>{
    //let [isPrimaryCare, setIsPrimaryCare] = useState(props.isProvider);
    let[name, setProviderName] = useState("")
    let[street, setAddress] = useState("")
    let[city, setCity] = useState("")
    let[state, setState] = useState("")
    let[postalCode, setZip] = useState("")
    let[email, setEmail]=useState("")
    let[phone, setPhone]= useState("")
    let[networkId, setNetworkProviderId] = useState()
    let[provider, setProvider] = useState();

    let address = {
        street,
        city,
        state,
        postalCode
    }

    let handleProvider =()=>{
        if(props.isProvider){
            setProvider(props.provider)
            return props.provider;
        }else{
            setProvider({
                name,
                email,
                phone,
                address,
            })

            return {
                name,
                email,
                phone,
                address,
            }
        }
    }


    return(
      <div>
          {props.isProvider ? <Row>
              <Form.Label className="col-form-label col-form-label-lg">Your primary care provider: </Form.Label>
              <Col className="col-5">
                  <Form.Group className="mb-3" controlId="formBasicUsername">
                      <Form.Label className="col-form-label col-form-label-lg">First Name</Form.Label>
                      <Form.Control readOnly defaultValue={props.provider.networkProviderLastName}  className="form-control form-control-lg" type="text" placeholder=""
                      />
                      <Form.Control.Feedback type="invalid">First name is required.</Form.Control.Feedback>
                  </Form.Group>
              </Col>
              <Col className="col-5">
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label className="col-form-label col-form-label-lg">Last Name</Form.Label>
                      <Form.Control  className="form-control form-control-lg" type="text" readOnly defaultValue={props.provider.networkProviderFirstName}
                      />
                  </Form.Group>
              </Col>

              <Row>
              </Row>
          </Row> : <div>
              <Row>
                  <Form.Label className="col-form-label col-form-label-lg">Provider details:</Form.Label>
                  <h6>(Physicians, Hospital, Medical equipment suppliers...)</h6>
                  <Col className="col">
                      <Form.Group className="mb-3" controlId="formBasicUsername">
                          <Form.Label className="col-form-label col-form-label-lg">Provider</Form.Label>
                          <Form.Control className="form-control form-control-lg" type="text"
                                        onChange={(val) => setProviderName(val.target.value)}/>
                      </Form.Group>
                  </Col>
              </Row>

              <Row>
                  <Col>
                      <Form.Group className="mb-3" controlId="formBasicPassword">
                          <Form.Label className="col-form-label col-form-label-lg">Address</Form.Label>
                          <Form.Control className="form-control form-control-lg" type="text"
                                        onChange={(val) => setAddress(val.target.value)}/>
                      </Form.Group>
                  </Col>
              </Row>
              <Row>
                  <Col className="col-6">
                      <Form.Group className="mb-3" controlId="formBasicUsername">
                          <Form.Label className="col-form-label col-form-label-lg">City</Form.Label>
                          <Form.Control className="form-control form-control-lg" type="text"
                                        onChange={(val) => setCity(val.target.value)}/>

                      </Form.Group>
                  </Col>
                  <Col className="col-4">
                      <Form.Group className="mb-3" controlId="formBasicPassword">
                          <Form.Label className="col-form-label col-form-label-lg">State</Form.Label>
                          <Form.Control className="form-control form-control-lg" type="text"
                                        onChange={(val) => setState(val.target.value)}/>
                      </Form.Group>
                  </Col>
                  <Col className="col-2">
                      <Form.Group className="mb-3" controlId="formBasicPassword">
                          <Form.Label className="col-form-label col-form-label-lg">Zip Code</Form.Label>
                          <Form.Control className="form-control form-control-lg" type="text"
                                        onChange={(val) => setZip(val.target.value)}/>
                      </Form.Group>
                  </Col>
              </Row>
              <Row>
                  <Col className="col-7">
                      <Form.Group className="mb-3" controlId="formBasicUsername">
                          <Form.Label className="col-form-label col-form-label-lg">Email</Form.Label>
                          <Form.Control className="form-control form-control-lg" type="text"
                                        onChange={(val) => setEmail(val.target.value)}/>

                      </Form.Group>
                  </Col>
                  <Col className="col-5">
                      <Form.Group className="mb-3" controlId="formBasicPassword">
                          <Form.Label className="col-form-label col-form-label-lg">Phone</Form.Label>
                          <Form.Control className="form-control form-control-lg" type="text"
                                        onChange={(val) => setPhone(val.target.value)}/>
                      </Form.Group>
                  </Col>
              </Row>
          </div>}
          <ClaimItemDetailsComponent policy={props.policy} handleProvider={handleProvider} claimType={props.claimType} provider={provider}/>
      </div>

    )
}

export default ProviderDetailsComponent;