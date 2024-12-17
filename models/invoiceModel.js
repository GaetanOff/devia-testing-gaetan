const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const Invoice = sequelize.define('Invoice', {
    number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    clientName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('PENDING', 'PAID', 'CANCELLED'),
        allowNull: false,
        defaultValue: 'PENDING',
    },
    dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

module.exports = Invoice;
