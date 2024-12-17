require('dotenv').config(); // Load environment variables
const app = require('./app');
const sequelize = require('./config/db');

const PORT = process.env.PORT || 3000; // Fallback to 3000 if PORT is not defined

// Sync database and start the server
sequelize.sync()
    .then(() => {
        console.log('Database connected and synced');
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch(error => {
        console.error('Unable to connect to the database:', error);
    });