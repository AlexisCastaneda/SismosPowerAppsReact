import { Fragment,useRef } from "react";
import { useSearchParams } from "react-router-dom";
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
//import Modal from 'react-bootstrap/Modal';

import { Modal } from "react-bootstrap";
import '../Styles/Inicio.css'

import axios from "axios";

const InicioPowerApps = () => {
    const [searchParamsName] = useSearchParams();
    const [searchParamsEmail] = useSearchParams();
    const [serchGeoLocalParams] = useSearchParams();

    const userNameParams = searchParamsName.get("user");
    const emailParams = searchParamsEmail.get("email"); 
    const geoLocalParams = serchGeoLocalParams.get("geolocal");

    let [setNombre] = useState("");
    let [setCorreo] = useState("");
    let [setLatitude] = useState(0);
    //let [longitude,setLongitude] = useState(0);
    const [pregunta, setPregunta] = useState(0);

    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);

    //EMBEBER google maps y mostrar los puntos de peronas que no se encuentran bien
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
            /*nombre === "" ? setNombre(userNameParams) : void(0);
            correo === "" ? setCorreo(emailParams) : void(0);
            const latlong = geoLocalParams.split(',')
/*
            console.log(latlong)

            latitud === "" ? setLatitude(latlong[0]) : void(0);
            longitude === "" ? setLongitude(latlong[1]) : void(0);*/

            const latlong = geoLocalParams.split(',')
            const data = {
                "name": userNameParams,
                "correo": emailParams,
                "lat": latlong[0]+"."+latlong[1],
                "long":latlong[2]+"."+latlong[3],
                "preg": pregunta
            }
            console.log(data)
            axios.post("http://localhost:3002/api/data/mariaDB/power",data) 
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
                            defaultValue={userNameParams}
                            id="nombre"
                            value={userNameParams}
                            onChangeCapture={(e) => setNombre(e.target.value)}

                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            placeholder="Email"
                            defaultValue={emailParams}
                            id="email"
                            value={emailParams}
                            onChangeCapture={(e) => setCorreo(e.target.value)}

                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>GeoLocalización</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Latitud,Longitud"
                            defaultValue={geoLocalParams}
                            id="GeoLocal"
                            value={geoLocalParams}
                            onChangeCapture={(e) => setLatitude(e.target.value)} //Mal

                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
                                        defaultChecked
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
                        defaultChecked
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



export default InicioPowerApps;


