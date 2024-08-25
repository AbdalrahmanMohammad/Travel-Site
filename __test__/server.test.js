const request = require('supertest');
const app = require('../src/server/index'); 

describe('Express Server API Endpoints', () => {

    // Test the root route
    it('should respond with a 200 status code for the root route', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
    });

    // Test the /getAll route with missing city or date
    it('should return a 400 status when city or date is missing', async () => {
        const response = await request(app)
            .post('/getAll')
            .send({
                date: '2024-09-15' // Missing city
            });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Text is required');
    });
});