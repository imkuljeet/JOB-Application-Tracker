// models/user.js
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../util/database');

const User = sequelize.define('User', {
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
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    careerGoals: {
        type: DataTypes.TEXT,
        allowNull: true // Career goals are optional
    }
});

// // Hash password before saving
// User.beforeSave(async (user, options) => {
//     if (user.password) {
//         user.password = await bcrypt.hash(user.password, 10);
//     }
// });

module.exports = User;
