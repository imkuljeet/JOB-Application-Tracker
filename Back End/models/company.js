// models/company.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Company = sequelize.define('Company', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contactDetails: {
        type: DataTypes.STRING,
        allowNull: true
    },
    companySize: {
        type: DataTypes.STRING,
        allowNull: true
    },
    industry: {
        type: DataTypes.STRING,
        allowNull: true
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    }
});

module.exports = Company;
