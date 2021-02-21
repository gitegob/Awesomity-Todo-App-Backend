import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import env from './env';

const swaggerSpecs = swaggerJsDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TodoApp',
      version: '1.0.0',
      description: 'An application to keep track of your tasks',
      contact: {
        name: 'Brian Gitego',
        email: 'gitegob7@gmail.com',
        github: 'https://github.com/gitego-brian'
      },
    },
    url: env.SERVER_URL,
  },
  security: ['JWT'],
  apis: ['src/routes/*.js']
});

export default swaggerSpecs;