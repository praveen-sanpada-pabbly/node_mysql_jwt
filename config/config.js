
require('dotenv').config()

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    database: process.env.DATABASE_NAME,       // Replace 'your_database_name' with your actual database name
    username: process.env.USER_NAME,   // Replace 'your_database_username' with your actual database username
    password: process.env.USER_PASSWORD,   // Replace 'your_database_password' with your actual database password
    host: process.env.HOST_NAME,
    dialect: 'mysql',
    secret: process.env.SECRET_KEY
});

module.exports = sequelize;
