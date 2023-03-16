const mariaDB = require("mysql2")

const config = mariaDB.createPool({
  /*user: process.env.USER_NAME_XAMPP,
  database: process.env.DATA_BASE_XAMPP,
  host: process.env.SERVER_XAMPP,
  port:3306*/
    host     : process.env.SERVER_MARIADB,
    user     : process.env.USER_NAME_MARIADB,
    password : process.env.PASSWORD_MARIADB,
    database : process.env.DATA_BASE_MARIADB,
    port     : process.env.PORT_MARIADB
});




module.exports = config