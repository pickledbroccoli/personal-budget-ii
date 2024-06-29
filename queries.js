const dotenv = require('dotenv');
dotenv.config();

const Pool = require('pg').Pool;
const pool = new Pool({
    user: process.env.DBUSER,
    host: process.env.DBHOST,
    database: process.env.DATABASE,
    password: process.env.DBPASSWORD,
    port: process.env.DBPORT
});


// callback fv-ek a routingokhoz

// get names
const getEnvelopeNames = (req, res) => {
   
    pool.query('SELECT envelope_name FROM envelopes', (err, results) => {
        if(err) {
            throw err;
        }
        res.status(200).json(results.rows);
    });
};

// get all data 
const getAllEnvelopes = (req, res) => {

    pool.query('SELECT * FROM envelopes', (err, results) => {
        if(err) {
            throw err;
        }
        res.status(200).json(results.rows);
    });
};







module.exports = { getEnvelopeNames, };