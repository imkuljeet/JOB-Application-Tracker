// models/job.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const Company = require('./company'); // Import Company model

const Job = sequelize.define('Job', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    company: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Applied'
    },
    reminderSet: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

// Define association
// Job.hasMany(Company, { foreignKey: 'jobId' });

module.exports = Job;
