const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const apiKeyAuth = require('./auth/apiKeyAuth');


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Swagger Express API',
      version: '1.0.0',
      description: 'A simple Express API with Swagger documentation',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
        apiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "x-api-key",
        }
      },
    },
    security: [
      {
        bearerAuth: [],
      },
      {
        apiKeyAuth: [],
      }
    ],
  },
  apis: ['./routes/*.js'],
  
};

const specs = swaggerJsdoc(options);

module.exports = {
  specs,
  swaggerUi,
};
