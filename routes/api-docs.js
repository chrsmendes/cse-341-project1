const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

// Serve Swagger UI at /api-docs
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;
