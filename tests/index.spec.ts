const request = require('supertest');
const app = require('../app');

describe('GET /api', () => {

    test('should respond with a 200 status code ', async () => {
        const resp = await request(app).get('/api/ususarios');
        expect(resp.statusCode).toBe(200);
    })
    
    
})
