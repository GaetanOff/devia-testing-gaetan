const chai = require('chai');
const chaiHttp = require('chai-http');
const supertest = require('supertest');
const app = require('../app'); // Import the main app
const sequelize = require('../config/db'); // Import the database configuration

const { expect } = chai;
const request = supertest(app);

chai.use(chaiHttp);

describe('Review Routes', () => {
    // Before running tests, sync the database
    before(async () => {
        await sequelize.sync({ force: true }); // Reset the database
    });

    // Test: Create a new review
    it('should create a new review', async () => {
        const res = await request.post('/reviews').send({
            rating: 5,
            comment: 'Great product!',
        });

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('id');
        expect(res.body.rating).to.equal(5);
        expect(res.body.comment).to.equal('Great product!');
    });

    // Test: Retrieve all invoices
    it('should retrieve all reviews', async () => {
        const res = await request.get('/reviews');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
    });
});
