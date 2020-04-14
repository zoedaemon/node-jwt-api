const request = require('supertest')
const app = require('../src/app')

describe('POST /users/login', () => {
    let name = "jane doe";
    let email = "email@mail.com";
    let pass = "pass123";
    
    beforeEach( async () => {
        const res = await request(app)
            .post('/users')
            .send({
                name:name,
                email: email,
                password: pass,
            })
        expect(res.statusCode).toEqual(201)
        return true;
    });
    
    afterAll(async () => {
        // still error : https://github.com/visionmedia/supertest/issues/520
        await app.close()
    });

    it('should successfuly login', async () => {
        const res = await request(app)
            .post('/users/login')
            .send({
                email: email,
                password: pass,
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('token')
    })
})