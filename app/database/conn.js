const { Sequelize } = require("sequelize")
require('dotenv').config()

const sequelize = new Sequelize( process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
})

try{
    sequelize.authenticate();
    console.log("Conectado ao banco de dados!")
} catch (err) {
    console.error(`[ERRO] - Erro ao se conectar a base de dados, motivo: \n${err}`)
}

module.exports = sequelize