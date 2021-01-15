const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send({ request: req })
})

app.get('/user/id=:id', (req, res) => {
    res.send({ user: { firstname: 'Egor', login: 'egorka777', dob: '12/06/1999' } })
})

const PORT = process.env.PORT || 5000;
app.listen(PORT);