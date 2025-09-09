const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'http://localhost';

app.use('/', require('./routes'));

app.listen(port, () => {
    console.log(`Server is running ${host}:${port}`);
});
