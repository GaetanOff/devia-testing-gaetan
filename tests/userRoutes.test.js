const chai = require('chai');
const chaiHttp = require('chai-http');
const supertest = require('supertest');
const app = require('../app'); // Import the app
const sequelize = require('../config/db'); // Import the database

const { expect } = chai;
const request = supertest(app);

chai.use(chaiHttp);

describe('User Routes', () => {
    // Before running tests, sync the database
    before(async () => {
        await sequelize.sync({ force: true }); // Reset the database
    });

    it('should create a new user', async () => {
        const res = await request.post('/users').send({
            name: 'John Doe',
            email: 'john.doe@example.com',
        });

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('id');
        expect(res.body.name).to.equal('John Doe');
        expect(res.body.email).to.equal('john.doe@example.com');
    });

    it('should retrieve all users', async () => {
        const res = await request.get('/users');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.equal(1); // Should have one user
    });

    it('should retrieve a user by ID', async () => {
        const user = await request.post('/users').send({
            name: 'Jane Doe',
            email: 'jane.doe@example.com',
        });

        const res = await request.get(`/users/${user.body.id}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('id', user.body.id);
        expect(res.body.name).to.equal('Jane Doe');
    });

    it('should update a user', async () => {
        const user = await request.post('/users').send({
            name: 'Alice',
            email: 'alice@example.com',
        });

        const res = await request.put(`/users/${user.body.id}`).send({
            name: 'Alice Updated',
        });

        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('Alice Updated');
    });

    it('should delete a user', async () => {
        const user = await request.post('/users').send({
            name: 'Bob',
            email: 'bob@example.com',
        });

        const res = await request.delete(`/users/${user.body.id}`);
        expect(res.status).to.equal(204);

        const findRes = await request.get(`/users/${user.body.id}`);
        expect(findRes.status).to.equal(404);
    });
});
