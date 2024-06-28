import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import "@cyntler/react-doc-viewer/dist/index.css";
import { AxiosUsersClient} from "../../utils/axios/axiosState";

let GetFileComponent =(props)=>{
    let axios = AxiosUsersClient();
    const jwt = props.jwt;
    let ind = props.path.lastIndexOf("/");
    let filename = props.path.slice(ind+1, props.path.length);

    let fetchFile =(e) =>{
        e.preventDefault()

        const headers = {
            Authorization: 'Bearer ' + jwt,
            'Content-Disposition': 'inline; filename="'+filename+'";'
        }
        axios({
            method:"get",
            url:"/api/fileUpload/files/" + filename,
            headers: headers,
            responseType: 'blob',
        })
            .then((data)=>{
                const blob = new Blob([data.data], )//{type: 'application/pdf'}
                const link = document.createElement('a')
                link.href = window.URL.createObjectURL(blob)
                window.open(link);
                console.log("File upload success: " + JSON.stringify(data))
            })
            .catch((error)=>{
                console.log("Error fetching policy." + error)
            })
    }

    return(
        <div>
            <Button style={{width:"100px"}} variant="success" onClick={(event)=>fetchFile(event)}>Show File</Button>
        </div>
    )
}

export default GetFileComponent;