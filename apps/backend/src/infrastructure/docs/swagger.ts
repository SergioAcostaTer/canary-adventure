// src/infrastructure/swagger.ts

import { Express } from 'express'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Canary Adventure API',
    version: '1.0.0',
    description: 'Documentación de la API del proyecto TFG'
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
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          email: { type: 'string', example: 'user@example.com' },
          username: { type: 'string' },
          full_name: { type: 'string' },
          avatar_url: { type: 'string', format: 'uri' },
          oauth_provider: { type: 'string', example: 'google' },
          oauth_id: { type: 'string' },
          locale: { type: 'string', example: 'es' },
          verified: { type: 'boolean' },
          plan: { type: 'string', enum: ['free', 'premium'] },
          role: { type: 'string', enum: ['user', 'admin'] }
        },
        required: ['id', 'email', 'username', 'oauth_provider', 'oauth_id']
      }
    }
  },
  security: [{ bearerAuth: [] }]
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
