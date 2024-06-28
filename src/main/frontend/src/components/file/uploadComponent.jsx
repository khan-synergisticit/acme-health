import React, {useState, useEffect} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import {AddMessageToStore} from "../../state/message/messageAction";
import {useDispatch} from "react-redux";
import GetFileComponent from "./getFile.jsx";

let UploadComponent = (props) =>{
    let [files, setFiles] = useState([]);
    let policyDocuments = props.documents;
    let dispatch = useDispatch();
    let [showFile, setShowFile] = useState([]);

    useEffect(()=>{
        policyDocuments.forEach((f)=>{
            console.log("3")
            showFile.push(false);
        })
        setShowFile(showFile)
    },[])


    let PathDisplay = ({doc, index})=>{
        let ind = doc.url.lastIndexOf("/");
        let newPath = doc.url.slice(ind+1, doc.url.length);
        return(
                <div>
                    {/*{showFile[index] ? <GetFileComponent path={newPath}/> : null}*/}
                    <Form.Label style={{marginLeft:"10px"}}>
                        {doc.accepted ? <h5>{newPath} ACCEPTED</h5> : <h5>{newPath} SUBMITTED</h5>}
                    </Form.Label>
                </div>
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

    let handleSubmit = async (e) =>{
        e.preventDefault()
        let meta = {
            policyId:props.policyId,
            fileTypes:[]
        }

        const formData = new FormData();
        files.forEach((file)=>{
            formData.append("file", file.file)
            meta.fileTypes = [...meta.fileTypes, file.type]
        })
        formData.append("meta", new Blob([JSON.stringify(meta)], {type: 'application/json'}))

        const headers = {
            Authorization: 'Bearer ' + props.jwt,
            'content-type': 'multipart/form-data',
        }
        axios({
            method:"post",
            url:"http://localhost:4242/api/fileUpload/policy",
            data:formData,
            headers: headers
        })
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
            {policyDocuments.map((doc, index) => {
                return(
                    <Col className="col-5" key={doc.type}>
                    <Form.Group className="mb-3"  style={{marginTop:"18px", marginBottom:"18px"}}>
                        <Form.Label>{doc.type}: </Form.Label>
                        <Form.Label>{doc.url !== '' ? <PathDisplay doc={doc} index={index}/>  : null}</Form.Label>
                        {!doc.accepted  ? <Form.Control type="file" multiple id={doc.type} onChange={handleFileChange}/> : <h6>Completed</h6>}
                        {doc.url !==''? <GetFileComponent jwt={props.jwt} path={doc.url}></GetFileComponent>: null}
                    </Form.Group>
                    </Col>
                    )
                })}
                {props.approved ? null : <Button variant="outline-primary" onClick={(e) => handleSubmit(e)}>Submit</Button>}
            </Form>
        </div>
    )
}

export default UploadComponent;