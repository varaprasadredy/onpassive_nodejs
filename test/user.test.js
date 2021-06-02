import request from 'supertest';
import expect from 'expect';
import app from '../index.js';

//Unit test case for User Login Endpoint
describe('User Login', () => {
    it('User login with valid details', async () => {
        await request(app)
            .post('/api/user/login')
            .send({
                email: "shiva@123.com", //Provide existing email
                password: "1234"
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.data).not.toBeUndefined()
            })
    });
    it('Check with invalid login details', async () => {
        await request(app)
            .post('/api/user/login')
            .send({
                email: "shiva@1234545454.co", //Provide not existing email
                password: "1234"
            })
            .expect(403)
            .then((res) => {
                console.log(res.body.message)
            })
    });
});

//Unit test case for User Login Endpoint
describe('User Signup', () => {
    it('Check user exist or not', async () => {
        await request(app)
            .post('/api/user')
            .send({
                email: "shiva@123.co", //Provide existing email
                password: "1234",
                name: "Shiva"
            })
            .expect(409)
            .then((res) => {
                console.log(res.body.message)
                expect(res.body.message).not.toBeUndefined()
            })
    });
    it('Create User with required fields', async () => {
        await request(app)
            .post('/api/user')
            .send({
                email: "shiva@123.com", //Provide not existing email
                password: "1234",
                name: "Shiva"
            })
            .expect(200)
            .expect((res) => {
                console.log(res.body.message)
                expect(res.body.message).not.toBeUndefined()
            })
    });
});
//Get All User
describe('Get All Users', () => {
    it('It should return all users', async () => {
        await request(app)
            .get('/api/user')
            .expect(200)
            .expect((res) => {
                expect(res.body.data).not.toBeUndefined()
            })
    });

    it('Check pagination options', async () => {
        await request(app)
            .get('/api/user')
            .query({ order: 'new', page: 0, limit: 3 })
            .expect(200)
            .expect((res) => {
                expect(res.body.data).not.toBeUndefined()
            })
    });
});