const mysql = require('mysql')


const dbConnection = mysql.createConnection({
    host: "database",
    port: 3306,
    user: "root",
    password: "abc123",
    database: "webb"
})

module.exports = dbConnection