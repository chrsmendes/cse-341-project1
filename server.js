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
        console.error('Database initialization failed:', err);
        process.exit(1);
    }
    
    console.log('Database connection ready');
    
    // Only start the server after database is connected
    app.listen(port, () => {
        console.log(`Server is running ${host}:${port}`);
    });
});
