const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.status(200);
})

app.get('/api/dishes', (req, res) => {
    res.send({
        data: ['Feruz', 'Chingiz', 'Kinguin']
    });
})

app.listen(port, () => {})
