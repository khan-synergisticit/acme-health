import React, {useState} from "react";

import {useDispatch} from "react-redux";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import {AddMessageToStore} from "../../state/message/messageAction";
import GetFileComponent from "./getFile.jsx";

let ClaimDocumentUpload = (props) =>{
    let claimDocuments = props.claim.claimDocuments;
    let [files, setFiles] = useState([]);
    let dispatch = useDispatch();


    let PathDisplay = ({doc})=>{
        let ind = doc.url.lastIndexOf("/");
        let newPath = doc.url.slice(ind+1, doc.url.length);
        return(
            <Form.Label style={{marginLeft:"10px"}}>
                {doc.accepted ? <h5>{newPath} ACCEPTED</h5> : <h5>{newPath} SUBMITTED</h5>}
            </Form.Label>
        )
    }

    let validate =(f, id)=>{
        let d = {
            type:id,
            file:f
        }
        let index =  isInFiles(id)
        if( index !== -1){
            files.splice(index, 1)
            setFiles([...files, d])
        } else {
            setFiles([...files, d])
        }
    }
    let isInFiles=(id)=>{
        for(let i = 0 ; i < files.length; i++){
            if(files[i].type === id){
                return i;
            }
        }
        return -1;
    }
    let handleFileChange =(e)=>{
        e.preventDefault();
        validate(e.target.files[0], e.target.id)


    }
    console.log("claimDocuments: " + JSON.stringify(claimDocuments))
    let handleSubmit = (e)=>{
        e.preventDefault()
        let meta = {
            claimId:props.claim.claimId,
            types:[]
        }

        const formData = new FormData();
        files.forEach((file)=>{
            formData.append("file", file.file)
            meta.types = [...meta.types, file.type]
            //formData.append("fileType", file.type)
        })
        formData.append("meta", new Blob([JSON.stringify(meta)], {type: 'application/json'}))
        const headers = {
            Authorization: 'Bearer ' + props.jwt,
            'content-type': 'multipart/form-data',
            //"Access-Control-Allow-Origin": "*",
        }
        console.log("Upload: " + JSON.stringify(meta))
        axios({
            method:"post",
            url:"http://localhost:4242/api/fileUpload/claim",
            data:formData,
            headers: headers
        })
            //axiosInstance.post('/api/fileUpload/', docs.documents, )
            .then((data)=>{
                console.log("File upload success: " + JSON.stringify(data))
                dispatch(AddMessageToStore("UPLOAD SUCCESS"));
                window.location.reload();
            })
            .catch((error)=>{
                console.log("Error fetching policy." + error)

            })
    }

    return(
        <div style={{marginTop:"18px"}}>
            <h5>Document Upload (max 2mb): </h5>
            <Form>
                {claimDocuments.map((doc, index) => {
                    return(
                        <Col className="col-5" key={index}>
                            <Form.Group className="mb-3"  style={{marginTop:"18px", marginBottom:"18px"}}>
                                <Form.Label>{doc.type}: </Form.Label>
                                <Form.Label>{doc.url !== '' ? <PathDisplay doc={doc}/>  : null}</Form.Label>
                                {doc.url !=='' ? <GetFileComponent jwt={props.jwt} path={doc.url}/> : null}
                                {!doc.accepted  ? <Form.Control type="file" multiple id={doc.type} onChange={handleFileChange}/> : <h6>Completed</h6>}
                            </Form.Group>
                        </Col>
                    )
                })}
                {props.approved ? null : <Button variant="outline-primary" onClick={(e) => handleSubmit(e)}>Submit</Button>}
            </Form>
        </div>
    )
}
export default ClaimDocumentUpload;