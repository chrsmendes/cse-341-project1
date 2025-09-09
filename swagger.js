const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'API for managing contacts',
  },
  host: process.env.SWAGGER_HOST || 'localhost:3000',
  schemes: [process.env.SWAGGER_SCHEME || 'http'],
  basePath: '/contacts',
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/contacts.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  // Post-process generated file: ensure operations are grouped under 'Contacts' tag
  const fs = require('fs');
  const out = require('./swagger-output.json');

  if (out && out.paths) {
    // Add tags array to root (useful for UI ordering and descriptions)
    out.tags = out.tags || [];
    if (!out.tags.find(t => t.name === 'Contacts')) {
      out.tags.push({ name: 'Contacts', description: 'Operations related to Contacts collection' });
    }

    Object.keys(out.paths).forEach((path) => {
      const methods = out.paths[path];
      Object.keys(methods).forEach((verb) => {
        const op = methods[verb];
        // replace default tag with Contacts or add Contacts tag if missing
        if (op.tags && Array.isArray(op.tags)) {
          op.tags = op.tags.filter(t => t.toLowerCase() !== 'default');
          if (!op.tags.includes('Contacts')) op.tags.unshift('Contacts');
        } else {
          op.tags = ['Contacts'];
        }
      });
    });

    fs.writeFileSync(outputFile, JSON.stringify(out, null, 2));
    console.log('swagger-output.json post-processed: tags normalized to Contacts');
  }
});