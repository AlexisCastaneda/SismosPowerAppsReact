const express = require("express");
const router = express.Router();
const config =require("../config/dataBaseMariaDB")
//const sql = require("mssql") 
            
router.post("/data/mariaDB/power/",(req,res) =>{
    const connection = config

    const nombre = req.body.name
    const correo = req.body.correo
    const lat = req.body.lat
    const long = req.body.long
    const pregunta = req.body.preg

    const qrTest = "Select count(*) as \"cuenta\" from alumnos_power where mail = \"" + correo + "\"and time BETWEEN DATE_SUB(NOW(), INTERVAL 1 DAY) and now();"
    connection.query(qrTest, (err, result) => {
        if(err){
            console.log(err)
        }else{
            console.log()
            //res.json(result)
            
            if(result[0].cuenta == 0){
                const qr = "Insert into alumnos_power(name,mail,lat,longi,preg)values('"+nombre+"','"+correo+"',"+lat+","+long+","+pregunta +");"
                connection.query(qr, (err, result) => {
                    if(err){
                        console.log(err)
                    }else{
                        console.dir(result)
                        res.json(result)
                    }
                })
            } else {
                res.status(400);
                res.json({"error":"Ya estas registrado"})
            }
        }
    })     
});


router.get("/data/mariaDB/power/count",(req,res) =>{
    const connection = config;
    //const qr = "select count(*) from alumnos_power;";
    const qr = "select count(*) from alumnos_power where time BETWEEN DATE_SUB(NOW(), INTERVAL 30 DAY) and now();";
        connection.query(qr, (err, result) => {
            if(err){
                console.log(err)
            }else{
                console.dir(result)
                res.json(result[0])
            }
        })
    //}

})

module.exports = router