const { DataTypes } = require("sequelize")
const db = require("./../../database/conn")
const User = require("./User")

const Vehicle = db.define("Vehicle", {
    driver_id: {
        type: DataTypes.INTEGER,
        include: {
            model: User,
            foreignKey: "id",
        },
        require: true,
    },
    car_model: {
        type: DataTypes.STRING,
        require: true,
    },
    licence_plate: {
        type: DataTypes.STRING,
        require: true,
    },
    status: {
        type: DataTypes.ENUM('accept', 'decline', 'pending'),
        require: false,
        defaultValue: 'pending',
    }
})

module.exports = Vehicle