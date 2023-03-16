import { Fragment} from "react";
import { useSearchParams } from "react-router-dom";
import React, { useState } from 'react';
//import Modal from 'react-bootstrap/Modal';


import '../Styles/Inicio.css'


//import Modal from 'react-bootstrap/Modal';

import '../Styles/Inicio.css'

import axios from "axios";

const ClosestOne = () => {

   /* const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });
    */

    const [punto, setPunto] = useState(0);

    const [searchLatitud,setSearchLatitud] = useSearchParams();
    const [searchLongitud,setSearchLongitud] = useSearchParams();

    let longi = searchLatitud.get("longitud"); 
    let lati = searchLongitud.get("latitud") ;
   
    

    const puntos = [["SP1",19.5919744731851,-99.2297846148218],["SP2",19.5917280784814,-99.229106555103],["SP3",19.5908694242434,-99.22955465022],["SP4",19.5910423085193,-99.2301377884034],["SP5",19.5924503780199,-99.2290662825127],["SP6",19.5954324357608,-99.228020736797],["SP7",19.5951809302608,-99.2276393555112],["SP8",19.596584319726,-99.2273917044222],
                    ["SP9",19.596384001715,-99.2269130947616],["SP10",19.5971650566999,-99.2260677920682],["SP11",19.5972836221669,-99.2267361627956],["SP12",19.5980230356393,-99.2259263283913],["SP13",19.5983318515888,-99.2266581614921],["SP14",19.5983609161302,-99.2253896082595],["SP15",19.5988649089458,-99.2260622173098],["SP16",19.5991833823199,-99.2256526695435]]

    const verPuntos = () => {
    //useEffect(() => {
        let minCor = [];
        let latiAux, longiAux, latitud;
        latiAux = lati.split(',');
        latiAux = latiAux[0].toString()+'.'+latiAux[1].toString();
        latiAux = parseFloat(latiAux)

        longiAux = longi.split(',');
        longiAux = longiAux[0].toString()+'.'+longiAux[1].toString();
        longiAux = parseFloat(longiAux)
        
        
        for(let i=0 ; i<puntos.length; i++){
            //console.log(Math.pow((lati - puntos[i][1]),2))
            minCor.push(Math.pow((latiAux - puntos[i][1]),2) + Math.pow((longiAux  - puntos[i][2]),2));
            
        };
        console.log(Math.min(...minCor))
        setPunto(puntos[minCor.indexOf(Math.min(...minCor))]);
        
    //});
        
    };
    

    return (
        <Fragment>
            <div className="sixe-font-cl" onMouseLeave={verPuntos}>
                El punto mas cercano es: 
            </div>
            <div className="sixe-font-cl2">
                {punto[0]}
            </div>
            <div className="sixe-button-ver">

            </div>

            
            

        </Fragment>
    );
};



export default ClosestOne;


