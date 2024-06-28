import React, {useState, useEffect} from "react";

import Modal from 'react-bootstrap/Modal';
import {useSelector} from "react-redux";


let MessagesModal =(props)=>{
    let Message = useSelector((state) => state.MessageReducer.Message)
    const [show, setShow] = useState(props.show);

    const handleClose = (e) => {
        setShow(false)};

    useEffect(()=>{
        if(Message){
            window.location.reload();
            setShow(true)
        }
    }, [Message])
    return (
        <>
            <Modal
                show={show}
                onHide={()=>handleClose()}
                animation={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{Message}</Modal.Title>
                </Modal.Header>
            </Modal>
        </>
    );
}

export default MessagesModal;