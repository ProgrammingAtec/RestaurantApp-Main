const express = require('express');
const app = express();
const dishes = require('./dishes');

app.get('/api/dishes/getAll', (req, res) => {
    res.status(200).send({ data: dishes });
})

app.listen(3000, () => {});
