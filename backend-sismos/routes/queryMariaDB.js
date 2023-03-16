const express = require("express");
const router = express.Router();
const config =require("../config/dataBaseMariaDB")
//const sql = require("mssql") 
            
router.post("/data/mariaDB/",(req,res) =>{
        const connection = config
        const nombre = req.body.name
        const apellido = req.body.lname
        const matricula = req.body.mat
        const pregunta = req.body.preg
        
        const qr = "Insert into alumnos(name,lname,mat,pregunta)values('"+nombre+"','"+apellido+"',"+matricula+","+pregunta +");"
        /*if(qr[0] == " " || qr[0] == "D" || qr[0] == "A" || qr[0] == "U" || qr[0] == "d" || qr[0] == "a" || qr[0] == "u"){
            console.log("empty space start")
            res.json({
                error: "INGRESA LOS DATOS DE MANERA CORRECTA"
            })
           
        }else{*/

            connection.query(qr, (err, result) => {
                if(err){
                    console.log(err)
                }else{
                    console.dir(result)
                    res.json(result)
                }
            })
        //}

})

module.exports = router