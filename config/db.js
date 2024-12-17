const { Sequelize } = require('sequelize');

// Initialize the database connection
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite' // SQLite file
});

module.exports = sequelize;
