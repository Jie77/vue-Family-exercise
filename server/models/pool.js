const mysql = require('mysql')

const opinion = {
    host: '127.0.0.1',
    user: 'root',
    password: '11111',
    port: '3306',
    database: 'stu_sys'
}

const pool = mysql.createPool(opinion)
module.exports = pool
