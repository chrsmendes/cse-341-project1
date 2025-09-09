const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const mongodb = require('./data/database');
const bodyParser = require('body-parser');
const app = express();

// parse application/json
app.use(bodyParser.json());

// CORS middleware (allow all origins for this project)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/api-docs', require('./routes/api-docs'));

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
