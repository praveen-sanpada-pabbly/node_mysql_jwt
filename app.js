
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const sequelize = require('./config/config');

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Welcome to node JWT app....");
});

app.use('/auth', authRoutes);
app.use('/products', productRoutes);

app.get('*', (req, res) => {
    res.send("404! Page Not Found....");
});

// Sync models with database
sequelize.sync().then(() => {
    console.log('Database synced');
}).catch(error => {
    console.error('Unable to sync database:', error);
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
