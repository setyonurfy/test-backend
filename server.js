const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./connection');
const response = require('./response');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');
const e = require('express');

const config = {
    name: 'sample-express-app',
    port: 3000,
    host: '0.0.0.0',
};

const app = express();
const logger = log({ console: true, file: false, label: config.name });

app.use(bodyParser.json());
app.use(cors());
app.use(ExpressAPILogMiddleware(logger, { request: true }));

// restful API user dan user_profile
app.get('/user', (req, res) => {
    const sql = 'SELECT * FROM User';
    db.query(sql, (err, result) => {
        response(200, result, 'get all data from user', res);
    });
});
app.get('/user_profile', (req, res) => {
    const sql = 'SELECT * FROM User_profile';
    db.query(sql, (err, result) => {
        response(200, result, 'get all data from user_profile', res);
    });
});

//grouping by created at
app.get('/find', (req, res) => {
    const sql = `SELECT email FROM User WHERE created_at = ${req.query.created_at}`;
    db.query(sql, (err, result) => {
        response(200, result, 'data ditemukan', res);
    });
});

app.post('/post', (req, res) => {
    const { id, email, phone, registered_at, created_at, updated_at } = req.body;
    console.log(req.body);

    const sql = `INSERT INTO User (id, email, phone, registered_at, created_at,updated_at) VALUES(${id}, '${email}', '${phone}',${registered_at}, ${created_at}, ${updated_at})`;

    db.query(sql, (err, fields) => {
        console.log(fields);
        // response(200, result, 'data added', res);
        res.send('added success');
    });
});

app.put('/update', (req, res) => {
    const { id, email, phone } = req.body;
    const sql = `UPDATE User SET email = '${email}', phone = '${phone}' WHERE id = ${id}`;
    db.query(sql, (err, fields) => {
        console.log(fields);
        response(200, 'update', 'put untuk update data', res);
    });
});

app.delete('/delete', (req, res) => {
    const { id } = req.body;
    const sql = `DELETE FROM User WHERE id = ${id}`;
    db.query(sql, (err, fields) => {
        console.log(fields);
        response(200, 'delete test', 'data telah dihapus', res);
    });
});

app.listen(config.port, config.host, (e) => {
    if (e) {
        throw new Error('Internal Server Error');
    }
    logger.info(`${config.name} running on ${config.host}:${config.port}`);
});