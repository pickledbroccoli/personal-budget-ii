const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('queries');
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

// CRUD routingok





app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
});