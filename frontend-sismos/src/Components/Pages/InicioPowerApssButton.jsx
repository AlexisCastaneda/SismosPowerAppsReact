import { Fragment } from "react";
import { useSearchParams } from "react-router-dom";
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

//import Modal from 'react-bootstrap/Modal';

import '../Styles/Inicio.css'

import axios from "axios";

const InicioPowerAppsButton = () => {

    const [searchParamsName, setSearchParamsName] = useSearchParams();
    const [searchParamsEmail, setSearchParamsEmail] = useSearchParams();
    const [serchGeoLocalParams,setSearchParamsGeoLocal] = useSearchParams();

    const [cAlumno, setcAlumnos] = useState("");
    
    const userNameParams = searchParamsName.get("user");
    const emailParams = searchParamsEmail.get("email"); 
    const geoLocalParams = serchGeoLocalParams.get("geolocal");
    
    //EMBEBER google maps y mostrar los puntos de peronas que no se encuentran bien

    const handleSubmit = () => {
            const latlong = geoLocalParams.split(',')
            const data = {
                "name": userNameParams,
                "correo": emailParams,
                "lat": latlong[0]+"."+latlong[1],
                "long":latlong[2]+"."+latlong[3],
                "preg": 1
            }

            console.log(data)
            axios.post("http://localhost:3002/api/data/mariaDB/power",data) 
            .then(response => console.log(response))
            
            setTimeout(getNumAlumno(), 100);
    };


    const getNumAlumno = () => {
        axios.get("http://localhost:3002/api/data/mariaDB/power/count") 
            .then(response => setcAlumnos(Object.values(response.data)))
        
        console.log(cAlumno);

    }


    return(
        <Fragment>
            
            <Button variant="primary" size="lg" onClick={handleSubmit} className="boton-six">
                Contar
            </Button>
            <div className="six-count">{cAlumno}</div>
            
            
        </Fragment>
    );
};



export default InicioPowerAppsButton;


