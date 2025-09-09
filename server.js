const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'http://localhost';

app.use('/', require('./routes'));

mongodb.initDB((err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    
    console.log('Database connection ready');
});

app.listen(port, () => {
    console.log(`Server is running ${host}:${port}`);
});
