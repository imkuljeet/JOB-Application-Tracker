// models/reminder.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Reminder = sequelize.define('Reminder', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Reminder;
