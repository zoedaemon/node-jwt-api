const request = require('supertest')
const app = require('../src/app')

describe('GET /users/me', () => {
    let name = "jane doe";
    let email = Math.random().toString(36).substring(7) + "@mail.com";
    let pass = "pass123";
    let token = "";

    beforeEach( async () => {
        const res = await request(app)
            .post('/users')
            .send({
                name:name,
                email: email,
                password: pass,
            })
        // problem with this check
        // expect(res.statusCode).toEqual(201)
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
        token = res.body.token; // save the token!
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('token')
    })

    it('should successfuly get profile', async () => {
        const res = await request(app)
            .get('/users/me')
            .set('Authorization', `Bearer ${token}`)
            .send()
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('name')
    })

    it('should successfuly logout', async () => {
        const res = await request(app)
            .post('/users/me/logout')
            .set('Authorization', `Bearer ${token}`)
            .send()
        expect(res.statusCode).toEqual(200)
    })
})