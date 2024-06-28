import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

let ShopPlansModalComponent=(props)=>{
    const [show, setShow] = useState(props.show);

    const handleClose = (e) => {
        props.handleCloseModal();
        setShow(false)};

    const handleContinue =() => {
        props.handleEnroll();
        handleClose()
    }

    return (
        <>
            <Modal
                show={show}
                size="xl"
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                animation={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Enrollment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Your total is ${props.policyTotal}. Click continue if you agree. </h4>
                    <h6>If you are a current customer, this policy will be added to your account. Otherwise, an account will be created with your email as your usename and "password" as the password. </h6>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={()=>handleContinue()}>Continue</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ShopPlansModalComponent;