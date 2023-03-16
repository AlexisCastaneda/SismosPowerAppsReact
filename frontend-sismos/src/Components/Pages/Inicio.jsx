import { Fragment,useRef } from "react";
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
//import Modal from 'react-bootstrap/Modal';

import { Modal } from "react-bootstrap";
import '../Styles/Inicio.css'

import axios from "axios";

const Inicio = () => {
    
    
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [matricula, setMatricula] = useState("");
    const [pregunta, setPregunta] = useState(0);
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);

    const form = useRef();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const allGood = () => setPregunta(1);
    const notaAllGood = () =>setPregunta(0);

    const handleSubmit = (event) => {

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        if (form.checkValidity() === true){
            //Enviar los datos con post
            event.preventDefault();
            const data = {
                "name": nombre,
                "lname": apellido,
                "mat": matricula,
                "preg": pregunta
            }
            console.log(data)
            //axios.post("http://192.168.50.251:3002/api/data/mariaDB",data)
            axios.post("http://localhost:3002/api/data/mariaDB",data) 
            .then(response => console.log(response))

            handleShow();
        }

        setValidated(true);
        
       
    };


    return(
        <Fragment>
            <div className="sixe-1"> 
            <Card>
                <Card.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit} ref={form}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Nombre"
                            defaultValue="Sixela"
                            id="nombre"
                            value={nombre}
                            onChangeCapture={(e) => setNombre(e.target.value)}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Apellido"
                            defaultValue="Castaneda"
                            id="apellido"
                            value={apellido}
                            onChangeCapture={(e)=> setApellido(e.target.value)}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                        <Form.Label>Maticula</Form.Label>
                        <InputGroup hasValidation>
                            <InputGroup.Text id="inputGroupPrepend">A0</InputGroup.Text>
                            <Form.Control
                            type="text"
                            placeholder="Usuario"
                            aria-describedby="inputGroupPrepend"
                            required
                            id="matricula"
                            value={matricula}
                            onChangeCapture={(e) => setMatricula(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                            Please choose a username.
                            </Form.Control.Feedback>
                        </InputGroup>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="validationCustom03">
                        <Form.Label>¿Te encuentras bien?</Form.Label>
                            <Form>
                                {['radio'].map((type) => (
                                    <div key={`inline-${type}`} className="mb-3">
                                    <Form.Check
                                        inline
                                        label="Si"
                                        name="group1"
                                        type={type}
                                        id={`inline-${type}-1`}
                                        required
                                        onClick={allGood}
                                    />
                                    <Form.Check
                                        inline
                                        label="No"
                                        name="group1"
                                        type={type}
                                        id={`inline-${type}-2`}
                                        required
                                        onClick={notaAllGood}
                                    />
                                    </div>
                                ))}
                            </Form>
                        
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Check
                        required
                        label="Agree to terms and conditions"
                        feedback="You must agree before submitting."
                        feedbackType="invalid"
                        />
                    </Form.Group>
                    <Button type="submit">Submit form</Button>
                    </Form>
                </Card.Body>
            </Card>
            </div>
            
            
            <Modal show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header > 
                    <Modal.Title>Envio Exitoso</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    Gracias por mandarme tu información.
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} href="/">
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
};



export default Inicio;


