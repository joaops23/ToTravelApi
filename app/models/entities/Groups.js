const { DataTypes } = require("sequelize")
const db = require("../../database/conn")
const { User } = require("..")

const Groups = db.define("Groups", {
    name: {
        type: DataTypes.STRING,
        require: true,
    },
    status: {
        type: DataTypes.BOOLEAN,
        require: false,
        defaultValue: true,
    }
})

module.exports = Groups