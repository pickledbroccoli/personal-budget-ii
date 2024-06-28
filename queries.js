const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'uborka',
    host: 'localhost',
    database: 'budget_envelopes',
    password: 'password',
    port: 5432
});


// callback fv-ek a routingokhoz

const getEnvelopeNames = (req, res) => {
   
    pool.query('SELECT envelope_name FROM envelopes', (err, results) => {
        if(err) {
            throw err;
        }
        res.status(200).json(results.rows);
    });
   
};








module.exports = { getEnvelopeNames, };