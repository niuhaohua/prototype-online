var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '6187b47776',
    port: '3306',
    database: 'test',
})
connection.connect()
exports.connection = connection