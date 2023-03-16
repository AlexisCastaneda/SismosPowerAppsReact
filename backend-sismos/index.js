//Defaults 
require("dotenv").config();


const express = require('express');
const app = express();
const cors = require("cors");


app.use(cors());

//Middelware
app.use(express.json())
app.use(express.urlencoded({extended:true}));


//app.use('/api', require("./routes/queryVuforia"));
//app.use('/api', require("./routes/queryVuforia"));
app.use('/api', require("./routes/queryMariaDB"));
app.use('/api', require("./routes/queryMariaDBpower"));


//Settings
const port = process.env.PORT || 3000;

//Start
app.listen(port, () => {
        console.log(port)
})
