const Sequelize = require("sequelize");

const sequelize = new Sequelize('JAT','root','Itsgreat_12345',{
    dialect : "mysql",
    host : 'localhost'
})

module.exports = sequelize;