import React from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button"
import { useDispatch} from "react-redux";
import {UpdateClaimDocs} from "../../state/claim/claimAction";
import GetFileComponent from "../file/getFile.jsx";
import "./adminClaim.css"


let AdminClaimDocView = (props)=>{
    let dispatch = useDispatch();
    let claimDocs = JSON.parse(JSON.stringify(props.claim.claimDocuments));
    console.log(props.claimStats)
    let handleDocumentAccept=(type)=>{
        for(let i = 0; i < claimDocs.length; i++){
            if(claimDocs[i].type===type){
                claimDocs[i].accepted = true;
            }
        }
        let claimDocuments = {
            claimId:props.claim.claimId,
            claimDocuments:claimDocs
        };
        dispatch(UpdateClaimDocs(claimDocuments, props.jwt));
        window.location.reload();
    }

    return(
        <Card>
            <Card.Body>
                <Card.Title className="admin-claim-card-title " >

                </Card.Title>
                {claimDocs.map((doc, index)=>{
                    if(doc.accepted){
                        return(<div key={index} >
                                <Card.Text style={{fontSize:"13px"}}>
                                    Type: {doc.type}  - UPLOADED : ACCEPTED
                                </Card.Text>
                                <GetFileComponent path={doc.url} jwt={props.jwt}/>
                            </div>
                        )
                    } else if(doc.url !== ""){
                        return(<div key={index} style={{marginTop:"10px"}}>
                                <Card.Text style={{fontSize:"13px"}}>
                                    Type: {doc.type}  - UPLOADED
                                </Card.Text>
                                <Button className="btn btn-primary" style={{width:"100px", margin:"10px",fontSize:"13px"}} onClick={()=> handleDocumentAccept(doc.type)}>
                                    Accept
                                </Button>
                                <Button className="btn btn-danger" style={{width:"100px",margin:"10px", fontSize:"13px"}}>
                                    Reject
                                </Button>
                                <GetFileComponent style={{width:"100px",margin:"10px", fontSize:"13px"}} path={doc.url} jwt={props.jwt}/>
                            </div>
                        )
                    }else {
                        return(<div key={index} >
                            <Card.Text className="font-weight-bold" style={{marginTop:"10px", fontSize:"13px"}}>
                                Type: {doc.type}  - STILL PENDING
                            </Card.Text>

                        </div>)
                    }
                })}
            </Card.Body>
        </Card>
    )
}
export default AdminClaimDocView;