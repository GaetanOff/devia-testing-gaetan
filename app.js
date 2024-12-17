const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());

// Create a write stream for log file
const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'),
    { flags: 'a' } // Append logs to the file
);

// Logging middleware (logs written to file)
app.use(morgan('combined', { stream: accessLogStream }));

// Routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/invoices', invoiceRoutes);
app.use('/reviews', reviewRoutes);

module.exports = app;
