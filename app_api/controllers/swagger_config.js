// https://www.npmjs.com/package/swagger-jsdoc
// will create an OAS3 compliant spec file based on jdoc comments

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Travlr API',
            version: '0.5.0',
        },
    },
    apis: ['./app_api/controllers/trips.js'],
};

const swaggerDocs = swaggerJSDoc(options);
module.exports = {swaggerDocs, swaggerUI};