const chai = require('chai');
const chaiHttp = require('chai-http');
const supertest = require('supertest');
const app = require('../app'); // Import the app
const sequelize = require('../config/db'); // Import the database

const { expect } = chai;
const request = supertest(app);

chai.use(chaiHttp);

describe('Product Routes', () => {
    // Before running tests, sync the database
    before(async () => {
        await sequelize.sync({ force: true }); // Reset the database
    });

    // Test: Create a new product
    it('should create a new product', async () => {
        const res = await request.post('/products').send({
            name: 'Laptop',
            price: 999.99,
            description: 'A high-end laptop',
        });

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('id');
        expect(res.body.name).to.equal('Laptop');
        expect(res.body.price).to.equal(999.99);
        expect(res.body.description).to.equal('A high-end laptop');
    });

    // Test: Retrieve all products
    it('should retrieve all products', async () => {
        const res = await request.get('/products');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.equal(1); // Should have one product
    });

    // Test: Retrieve a product by ID
    it('should retrieve a product by ID', async () => {
        const product = await request.post('/products').send({
            name: 'Smartphone',
            price: 499.99,
            description: 'A mid-range smartphone',
        });

        const res = await request.get(`/products/${product.body.id}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('id', product.body.id);
        expect(res.body.name).to.equal('Smartphone');
        expect(res.body.price).to.equal(499.99);
    });

    // Test: Update a product
    it('should update a product', async () => {
        const product = await request.post('/products').send({
            name: 'Tablet',
            price: 299.99,
            description: 'A lightweight tablet',
        });

        const res = await request.put(`/products/${product.body.id}`).send({
            name: 'Updated Tablet',
            price: 399.99,
        });

        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('Updated Tablet');
        expect(res.body.price).to.equal(399.99);
        expect(res.body.description).to.equal('A lightweight tablet'); // Unchanged
    });

    // Test: Delete a product
    it('should delete a product', async () => {
        const product = await request.post('/products').send({
            name: 'Monitor',
            price: 199.99,
            description: 'A 24-inch monitor',
        });

        const res = await request.delete(`/products/${product.body.id}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message', 'Produit supprimé avec succès');

        const findRes = await request.get(`/products/${product.body.id}`);
        expect(findRes.status).to.equal(404);
    });

    // Test: Handle invalid product creation
    it('should return 400 when creating a product with missing fields', async () => {
        const res = await request.post('/products').send({
            price: 123.45,
        });

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message', 'Les champs name et price sont requis');
    });

    // Test: Handle product not found
    it('should return 404 when retrieving a non-existent product', async () => {
        const res = await request.get('/products/9999'); // Invalid ID
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('message', 'Produit non trouvé');
    });

    // Test: Handle invalid update
    it('should return 404 when updating a non-existent product', async () => {
        const res = await request.put('/products/9999').send({
            name: 'Non-existent Product',
        });

        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('message', 'Produit non trouvé');
    });

    // Test: Handle invalid delete
    it('should return 404 when deleting a non-existent product', async () => {
        const res = await request.delete('/products/9999');
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('message', 'Produit non trouvé');
    });
});
