const { DataTypes } = require("sequelize")
const db = require("./../../database/conn")
const User = require("./User")
const Groups = require("./Groups")

const Travels = db.define("Travels", {
    userRoot: {
        type: DataTypes.INTEGER,
        include: {
            model: User,
            foreignKey: "id",
        },
    },
    userDriver: {
        type: DataTypes.INTEGER,
        include: {
            model: User,
            foreignKey: "id",
        },
        require: true,
    },
    status: {
        type: DataTypes.ENUM('open', 'accept', 'decline', 'pending'),
        require: false,
        defaultValue: 'pending',
    },
    travel_distance: {
        type: DataTypes.FLOAT,
        require: true
    },
    travel_payment: {
        type: DataTypes.FLOAT,
        require: true,
    },
    origin: {
        type: DataTypes.STRING,
        require: true,
    },
    destiny: {
        type: DataTypes.STRING,
        require: true,
    }
})

Travels.belongsTo(Groups, {foreignKey: "group_id"})


module.exports = Travels