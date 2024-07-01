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

// MARK: HELPERS
// helper/util fv-ek

const getIndexByName = (thisName) => {
        
    return true;
};



// MARK: CALLBACKS
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

// get envelope by name
const getEnvelope = (req, res) => {
    
    const thisEnvelope = req.params.name;

    pool.query('SELECT * FROM envelopes WHERE envelope_name = $1', [thisEnvelope], (err, results) => {
        if(err) {
            throw err;
        }
        res.status(200).json(results.rows);
    });
};

// post to create new envelope

const createNewEnvelope = (req, res) => {
    
    const newName = req.body.name;
    const newBudget = Number(req.body.budget);

    pool.query('INSERT INTO envelopes (envelope_name, balance, budget, last_modified) VALUES ($1, 0, $2, NOW())', [newName, newBudget], (err, results) => {
        if(err) {
            throw err;
        }
        res.status(201).send(`Envelope ${newName} created`);
    });

};



module.exports = { getEnvelopeNames, getAllEnvelopes, getEnvelope, createNewEnvelope, };