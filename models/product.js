
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Product = sequelize.define('Product', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    },
    inventoryCount: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Product;
