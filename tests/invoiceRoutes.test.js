const chai = require('chai');
const chaiHttp = require('chai-http');
const supertest = require('supertest');
const app = require('../app'); // Import the main app
const sequelize = require('../config/db'); // Import the database configuration

const { expect } = chai;
const request = supertest(app);

chai.use(chaiHttp);

describe('Invoice Routes', () => {
    // Before running tests, sync the database
    before(async () => {
        await sequelize.sync({ force: true }); // Reset the database
    });

    // Test: Create a new invoice
    it('should create a new invoice', async () => {
        const res = await request.post('/invoices').send({
            number: 'INV-001',
            clientName: 'John Doe',
            amount: 1500.50,
            status: 'PENDING',
            dueDate: '2024-12-31',
        });

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('number', 'INV-001');
    });


    // Test: Retrieve all invoices
    it('should retrieve all invoices', async () => {
        await request.post('/invoices').send({
            number: 'INV-001',
            clientName: 'John Doe',
            amount: 1500.50,
            dueDate: '2024-12-31',
        });

        const res = await request.get('/invoices');
        expect(res.status).to.equal(200);
        expect(res.body.length).to.be.at.least(1);
    });

    // Test: Retrieve an invoice by ID
    it('should retrieve an invoice by ID', async () => {
        const createRes = await request.post('/invoices').send({
            number: 'INV-002',
            clientName: 'Jane Doe',
            amount: 1200.75,
            dueDate: '2024-12-30',
        });

        const invoiceId = createRes.body.id;

        const res = await request.get(`/invoices/${invoiceId}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('number', 'INV-002');
    });


    // Test: Update an invoice
    it('should update an invoice', async () => {
        const createRes = await request.post('/invoices').send({
            number: 'INV-003',
            clientName: 'Mark Smith',
            amount: 2000.00,
            dueDate: '2024-12-25',
        });

        const invoiceId = createRes.body.id;

        const res = await request.put(`/invoices/${invoiceId}`).send({
            amount: 2100.00,
        });

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('amount', 2100.00);
    });

    // Test: Delete an invoice
    it('should delete an invoice', async () => {
        const createRes = await request.post('/invoices').send({
            number: 'INV-004',
            clientName: 'Emma Brown',
            amount: 1800.00,
            dueDate: '2024-12-20',
        });

        const invoiceId = createRes.body.id;

        const res = await request.delete(`/invoices/${invoiceId}`);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message', 'Facture supprimée avec succès'); 
    });

    // Test: Handle invalid invoice creation
    it('should return 400 when creating an invoice with missing fields', async () => {
        const res = await request.post('/invoices').send({
            clientName: 'Incomplete Invoice',
        });

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message', 'Les champs number, clientName, amount et dueDate sont requis');
    });

    // Test: Handle retrieving a non-existent invoice
    it('should return 404 when retrieving a non-existent invoice', async () => {
        const res = await request.get('/invoices/9999'); // Non-existent ID
        expect(res.status).to.equal(404); // Expect a 404 Not Found status
        expect(res.body).to.have.property('message', 'Facture non trouvée'); // Verify error message
    });

    // Test: Handle updating a non-existent invoice
    it('should return 404 when updating a non-existent invoice', async () => {
        const res = await request.put('/invoices/9999').send({
            status: 'paid',
        });

        expect(res.status).to.equal(404); // Expect a 404 Not Found status
        expect(res.body).to.have.property('message', 'Facture non trouvée'); // Verify error message
    });

    // Test: Handle deleting a non-existent invoice
    it('should return 404 when deleting a non-existent invoice', async () => {
        const res = await request.delete('/invoices/9999');
        expect(res.status).to.equal(404); // Expect a 404 Not Found status
        expect(res.body).to.have.property('message', 'Facture non trouvée'); // Verify error message
    });
});
