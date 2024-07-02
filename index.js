const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./queries');
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (req, res, next) => {
    res.json({
        info: 'Node.js, Express and PostgreSQL API'
    });
});

// CRUD routingok a queries fv-eivel

// get all the names of available envelopes
app.get('/envelope-names', db.getEnvelopeNames);

// get all the envelopes' data
app.get('/envelopes', db.getAllEnvelopes);

// get a specific envelope by NAME
app.get('/envelopes/:name', db.getEnvelope);

// POST route to create new envelope
app.post('/envelopes', db.createNewEnvelope);

// delete a specific envelope by NAME
app.delete('/envelopes/:name', db.deleteEnvelope);


// change balance in specific envelope - amount in Headers
// this always ADDs(+) -> frontend should handle (-1 *) for deduction, (+1 *) for addition
app.put('/envelopes/change-balance/:name', db.changeBalance);


// transfer budgets between envelopes (amount in header) - could this be two update calls?
app.put('/envelopes/transfer/:from/:to', db.transferBetween);








app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
});