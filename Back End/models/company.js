// models/company.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const Job = require('./jobs'); // Import Job model

const Company = sequelize.define('Company', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
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
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    jobId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //     model: 'jobs', // name of the target table
        //     key: 'id'      // key in the target table
        // }
    }
});

// Define association
// Company.belongsTo(Job, { foreignKey: 'jobId' });

module.exports = Company;
