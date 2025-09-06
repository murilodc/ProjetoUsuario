import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Usuários',
            version: '1.0.0',
            description: 'Documentação da API de Usuários',
        },
    },
    apis: ['./src/routes/*.ts'], // Path to the API docs
};
const swaggerSpec = swaggerJsDoc(options);
export function setupSwagger(app) {
    app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
;
