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

    pool.query('SELECT * FROM envelopes ORDER BY id ASC', (err, results) => {
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

    if ((newName !== '') &&  (newBudget >= 0)) {

        pool.query('INSERT INTO envelopes (envelope_name, balance, budget, last_modified) VALUES ($1, 0, $2, NOW())', [newName, newBudget], (err, results) => {
            if(err) {
                throw err;
            }
            res.status(201).send(`Envelope ${newName} created`);
        });
    } else {
        res.status(400).send('Name and valid budget value must be provided');
    }
};

// delete a specific envelope by NAME
const deleteEnvelope = (req, res) => {
    
    const thisEnvelope = req.params.name;
    
    // only empty envelopes get to be deleted - this check should be imlpemented in the DB
    pool.query('DELETE FROM envelopes WHERE envelope_name = $1', [thisEnvelope], (err, results) => {
        if(err) {
            throw err;
        }
        res.status(204).send(`${thisEnvelope} deleted`);
    });
      
};

// UPDATE balance - both for withdraw and addition - frontend should handle when to use
const changeBalance = (req, res) => {
    const thisEnvelope = req.params.name;
    const withThisAmount = Number(req.header('amount'));
        
    pool.query('UPDATE envelopes SET balance = balance + $1 WHERE envelope_name = $2', [withThisAmount, thisEnvelope], (err, results) => {
        if(err) {
            throw err;
        }
        res.status(200).send(`Balance of ${thisEnvelope} updated`);
    });
    
};

module.exports = { getEnvelopeNames, getAllEnvelopes, getEnvelope, createNewEnvelope, deleteEnvelope, changeBalance, };