const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const database = require('./database');
const dishes = require('./dishes');

let store = new database();

app.use(bodyParser.json());

app.get('/api/dishes/getAll', (req, res) => {
    res.status(200).send({ data: dishes });
});

app.get('/api/database/getAll', (req, res) => {
    res.status(200).send(store.getAll());
})

app.post('/api/cart/make-order', (req, res) => {
    store.write(req.body.tableId, req.body.order);
    res.sendStatus(200);
});

app.listen(3000, '192.168.100.7', () => {});
