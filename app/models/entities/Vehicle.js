const { DataTypes, Model } = require("sequelize")
const sequelize = require("./../../database/conn")
const User = require("./User")

class Vehicle extends Model{}

Vehicle.init({
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
}, {
    sequelize,
    modelName: 'Vehicle'
})

module.exports = Vehicle