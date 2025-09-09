const dotenv = require('dotenv');
dotenv.config();

const { MongoClient } = require('mongodb');

let database;

const initDB = (callback) => {
    if (database) {
        console.log('Database is already initialized!');
        return callback(null, database);
    }

    MongoClient.connect(process.env.MONGO_URI, { 
        tls: true,
        tlsAllowInvalidCertificates: false,
        serverSelectionTimeoutMS: 30000,
        connectTimeoutMS: 30000,
        socketTimeoutMS: 30000
    })
    .then((client) => {
        database = client;
        console.log('Connected to MongoDB successfully!');
        callback(null, database);
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
        callback(err);
    });
};

const getDatabase = () => {
    if (!database) {
        throw new Error('Database not initialized');
    }
    return database;
};

module.exports = {
    initDB,
    getDatabase
};
