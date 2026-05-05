import { NextResponse } from 'next/server';

const apiDoc = {
  openapi: '3.0.0',
  info: {
    title: 'Ethio Agency Hub API',
    version: '1.0.0',
    description: 'API for managing employment agency operations including employees, documents, travel, and billing.',
    contact: {
      name: 'API Support',
      email: 'support@ethioagencyhub.com'
    }
  },
  servers: [
    {
      url: '/api',
      description: 'Current API version'
    }
  ],
  paths: {
    '/auth/login': {
      post: {
        summary: 'User login',
        tags: ['Authentication'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string', format: 'email' },
                  password: { type: 'string', minLength: 8 }
                },
                required: ['email', 'password']
              }
            }
          }
        },
        responses: {
          '200': { description: 'Login successful' },
          '401': { description: 'Invalid credentials' }
        }
      }
    },
    '/auth/register': {
      post: {
        summary: 'Register new agency',
        tags: ['Authentication'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  agencyName: { type: 'string' },
                  email: { type: 'string', format: 'email' },
                  password: { type: 'string', minLength: 8 },
                  name: { type: 'string' }
                }
              }
            }
          }
        },
        responses: {
          '201': { description: 'Registration successful' },
          '400': { description: 'Validation error' }
        }
      }
    },
    '/auth/refresh': {
      post: {
        summary: 'Refresh access token',
        tags: ['Authentication'],
        responses: {
          '200': { description: 'Token refreshed' },
          '401': { description: 'Invalid refresh token' }
        }
      }
    },
    '/employees': {
      get: {
        summary: 'List employees',
        tags: ['Employees'],
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 20 } }
        ],
        responses: {
          '200': { description: 'Employee list' }
        }
      },
      post: {
        summary: 'Create employee',
        tags: ['Employees'],
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  role: { type: 'string' },
                  destination: { type: 'string' }
                },
                required: ['name']
              }
            }
          }
        },
        responses: {
          '201': { description: 'Employee created' }
        }
      }
    },
    '/employees/{id}': {
      get: {
        summary: 'Get employee by ID',
        tags: ['Employees'],
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
        ],
        responses: {
          '200': { description: 'Employee details' },
          '404': { description: 'Employee not found' }
        }
      },
      put: {
        summary: 'Update employee',
        tags: ['Employees'],
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
        ],
        responses: {
          '200': { description: 'Employee updated' }
        }
      },
      delete: {
        summary: 'Delete employee',
        tags: ['Employees'],
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
        ],
        responses: {
          '200': { description: 'Employee deleted' }
        }
      }
    },
    '/documents': {
      get: {
        summary: 'List documents',
        tags: ['Documents'],
        security: [{ bearerAuth: [] }],
        responses: {
          '200': { description: 'Document list' }
        }
      },
      post: {
        summary: 'Upload document',
        tags: ['Documents'],
        security: [{ bearerAuth: [] }],
        responses: {
          '201': { description: 'Document uploaded' }
        }
      }
    },
    '/travel': {
      get: {
        summary: 'List travels',
        tags: ['Travel'],
        security: [{ bearerAuth: [] }],
        responses: {
          '200': { description: 'Travel list' }
        }
      },
      post: {
        summary: 'Create travel',
        tags: ['Travel'],
        security: [{ bearerAuth: [] }],
        responses: {
          '201': { description: 'Travel created' }
        }
      }
    },
    '/reporting/overview': {
      get: {
        summary: 'Get overview statistics',
        tags: ['Reporting'],
        security: [{ bearerAuth: [] }],
        responses: {
          '200': { description: 'Overview data' }
        }
      }
    },
    '/billing/plans': {
      get: {
        summary: 'Get subscription plans',
        tags: ['Billing'],
        responses: {
          '200': { description: 'Available plans' }
        }
      }
    },
    '/billing/payment': {
      post: {
        summary: 'Process payment',
        tags: ['Billing'],
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  planId: { type: 'string', enum: ['BASIC', 'PREMIUM', 'ENTERPRISE'] },
                  paymentMethod: { type: 'string', enum: ['telebirr', 'cbe', 'awash', 'card'] },
                  amount: { type: 'number' }
                }
              }
            }
          }
        },
        responses: {
          '201': { description: 'Payment initiated' }
        }
      }
    }
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      Employee: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          role: { type: 'string' },
          destination: { type: 'string' },
          status: { type: 'string' }
        }
      },
      Document: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          type: { type: 'string' },
          status: { type: 'string' },
          filePath: { type: 'string' }
        }
      },
      Travel: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          destination: { type: 'string' },
          departureAt: { type: 'string', format: 'date-time' },
          status: { type: 'string' }
        }
      }
    }
  },
  tags: [
    { name: 'Authentication', description: 'User authentication endpoints' },
    { name: 'Employees', description: 'Employee management' },
    { name: 'Documents', description: 'Document handling' },
    { name: 'Travel', description: 'Travel scheduling' },
    { name: 'Reporting', description: 'Analytics and reporting' },
    { name: 'Billing', description: 'Subscription and payments' }
  ]
};

export async function GET() {
  return NextResponse.json(apiDoc, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}