const Invoice = require('../models/invoiceModel');

// GET all invoices
exports.getAllInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.findAll();
        res.status(200).json(invoices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET invoice by ID
exports.getInvoiceById = async (req, res) => {
    try {
        const invoice = await Invoice.findByPk(req.params.id);
        if (!invoice) {
            return res.status(404).json({ message: 'Facture non trouvée' });
        }
        res.status(200).json(invoice);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// POST create new invoice
exports.createInvoice = async (req, res) => {
    try {
        const { number, clientName, amount, status, dueDate } = req.body;

        // Validation des champs obligatoires
        if (!number || !clientName || !amount || !dueDate) {
            return res.status(400).json({ message: 'Les champs number, clientName, amount et dueDate sont requis' });
        }

        const newInvoice = await Invoice.create({ number, clientName, amount, status, dueDate });
        res.status(201).json(newInvoice);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// PUT update invoice
exports.updateInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findByPk(req.params.id);

        if (!invoice) {
            return res.status(404).json({ message: 'Facture non trouvée' });
        }

        await invoice.update(req.body);
        res.status(200).json(invoice);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE invoice
exports.deleteInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findByPk(req.params.id);

        if (!invoice) {
            return res.status(404).json({ message: 'Facture non trouvée' });
        }

        await invoice.destroy();
        res.status(200).json({ message: 'Facture supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// FILTER invoice by status
exports.getAllInvoices = async (req, res) => {
    try {
        const { status } = req.query;
        const queryOptions = {};
        if (status) {
            // Optionnel : valider ici que le statut est une des valeurs attendues
            queryOptions.where = { status };
        }
        const invoices = await Invoice.findAll(queryOptions);
        res.status(200).json(invoices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
