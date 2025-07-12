// src/infrastructure/swagger.ts

import { Express } from 'express'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Canary Adventure API',
    version: '1.0.0',
    description: 'Documentación oficial de la API de Canary Adventure'
  },
  servers: [
    {
      url: 'http://localhost:8000',
      description: 'Servidor local'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  security: [
    {
      bearerAuth: []
    }
  ]
}

const options = {
  swaggerDefinition,
  apis: [
    'src/routes/**/*.ts',
    'src/controllers/**/*.ts',
    'src/contracts/**/*.ts'
  ]
}

const swaggerSpec = swaggerJSDoc(options)

export const setupSwagger = (app: Express): void => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}
