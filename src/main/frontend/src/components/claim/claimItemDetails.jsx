import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useAuth} from "../../state/auth/useAuth";
import {SaveClaimToDB} from "../../state/claim/claimAction";
import {currencyFormatter} from "../../utils/utils";

let ClaimItemDetailsComponent = (props) =>{
    let policy = props.policy;
    let {user} = useAuth();
    let [numItems, setNumItems] = useState(0)
    let [tableItems, setTableItems] = useState([])
    let [fromDates, setFromDates] = useState([])
    let [toDates, setToDates] = useState([])
    let [items, setItems] = useState([])
    let[costs, setCost] = useState([])
    let [total, setTotal] = useState(0.0);
    let dispatch = useDispatch();

    let {dependents, ...member} = policy.member;

    useEffect(()=>{
        setTables();
    },[])

    let handleTotal=  (ct)=>{
        let t = 0;
        ct.forEach((c)=>{ t+=c})
        setTotal(t)
    }


    let handleCost =  (c, index)=>{
        c.preventDefault()

         costs[index] = parseFloat(c.target.value);
         setCost(costs)
        handleTotal(costs)
    }



    let handleItems = (d, index) =>{
        items[index] = d.target.value;
        setItems(items);
    }

    let handleFromDates = (f, index) =>{
        fromDates[index] = f.target.value;
        setFromDates(fromDates);
    }

    let handleToDates = (t, index) =>{
        toDates[index] = t.target.value;
        setToDates(toDates)
    }

    let tableItem = (i) =>{
        toDates.push("");
        setToDates(toDates);
        fromDates.push("");
        setFromDates(fromDates)
        items.push("")
        setItems(items);
        costs.push(0.0)
        setCost(costs)

        return (
            <tr key={i}>
                <td>
                    <Form.Control required={true} className="col-form-label-lg" onChange={(e)=>handleFromDates(e, i)} type="date">
                    </Form.Control>
                    <Form.Label>From</Form.Label>
                    <Form.Control required={true} className="col-form-label-lg" onChange={(e)=>handleToDates(e, i)} type="date">
                    </Form.Control>
                    <Form.Label>To</Form.Label>
                </td>
                <td>
                    <Form.Control style={{height: "100px"}} className="form-control form-control-lg" type="text"
                                  placeholder="" id="itemdescription" onChange={(e)=>handleItems(e, i)}/>
                </td>
                <td>
                    <input className="form-control form-control-lg" type="text" step="any"
                                  onChange={(e) => handleCost(e, i)}/>
                </td>
            </tr>
        )
    }

    let addTableItems = () => {

        tableItems.push(tableItem(numItems));
        setNumItems(numItems + 1)
    }
    let setTables = () => {
        let n = 3;
        for (let i = 0; i < n; i++) {
                tableItems.push(tableItem(i))
                setTableItems(tableItems);

        }
        setNumItems(n)
    }

    let handleSubmit =  () => {
        let provider = props.handleProvider();
        let dates = []
        for(let i = 0; i < numItems; i++){
            let date = [fromDates[i], toDates[i]];
            dates.push(date)
        }
        let claimCharge = {
            provider,
            costs,
            items,
            dates,
            totalCost:total
        }
        let today = new Date().toISOString().slice(0, 10);


        let claimForm = {
            policyId:policy.policyId,
            memberId:policy.memberId,
            claimDate:today,
            patient:member,
            claimStatus:"SUBMITTED",
            claimCharge:claimCharge,
            claimType:props.claimType
        }

        let claim = {
            jwt:user.jwt,
            claimForm
        }
        dispatch(SaveClaimToDB(claim))

    }

    return (
        <div>
            <Table striped bordered hover>
                <thead style={{fontSize:"15px"}}>
                <tr>
                    <th style={{width:"20%"}}>Dates of Service</th>
                    <th style={{width:"60%"}}>Procedures, Services, Supplies</th>
                    <th style={{width:"20%"}}>Charge</th>
                </tr>
                </thead>
                <tbody>
                {tableItems.length > 1? tableItems.map((t)=>{
                    return t;
                }) : null}
                </tbody>
            </Table>
            <Row>
                <Col className="col-2">
                    < button className="float-start "  style={{border:"none", fontSize:"15px", background:"transparent", color:"blue"}} onClick={()=>addTableItems()}>Add More Items</button>
                </Col>
                <Col >
                    <h4  className=" float-end">
                        TOTAL: {currencyFormatter.format(total)}
                    </h4>
                </Col>
            </Row>
            <Row style={{marginTop:"40px"}}>
                <Col>
                    <Button className="mb-6" size="lg" variant="primary" type="button"  onClick={handleSubmit}>
                        Submit
                    </Button>
                </Col>
            </Row>
        </div>
    )
}

export default ClaimItemDetailsComponent;