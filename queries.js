const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'uborka',
    host: 'localhost',
    database: 'budget_envelopes',
    password: 'password';
    port: 5432
});


// callback fv-ek a routingokhoz

const getTableNames = (req, res) => {
    pool.query('SELECT envelope_name FROM envelopes ORDER BY id', (err, result) => {
        if(err) {
            throw err;
        }
        res.status(200).json(results.rows);
    });
};








module.export {};