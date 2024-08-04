const express = require('express');
const sql = require('mssql');

const app = express();
const port = 3000;

// SQL Server configuration
const dbConfig = {
    user: 'cs_admin', 
    password: 'Harrison1821!?!?@', 
    server: 'DESKTOP-Q1B7VUD', 
    database: 'clubbed_sanwich_web', 
    options: {
        encrypt: true 
    }
};

// Connect to SQL Server
sql.connect(dbConfig, err => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to SQL Server');
    }
});

// Middleware to parse JSON
app.use(express.json());

// API endpoint to log product interactions
app.post('/api/interactions', async (req, res) => {
    const { productName, userId, action } = req.body;

    try {
        const result = await sql.query`INSERT INTO ProductInteractions (ProductName, UserId, Action) VALUES (${productName}, ${userId}, ${action})`;
        res.status(200).send('Interaction logged successfully');
    } catch (err) {
        console.error('Error logging interaction:', err);
        res.status(500).send('Error logging interaction');
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost\DESKTOP-Q1B7VUD:${port}`);
});