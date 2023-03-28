const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    port: '3357',
    user: 'root',
    password: 'test',
    database: 'db_user',
});

module.exports = db;