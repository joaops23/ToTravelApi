const { DataTypes, Model } = require("sequelize")
const sequelize = require("../../database/conn")
const { MembersGroup } = require("..")

class Groups extends Model{}

Groups.init({
    name: {
        type: DataTypes.STRING,
        require: true,
    },
    status: {
        type: DataTypes.BOOLEAN,
        require: false,
        defaultValue: true,
    }
}, {
    sequelize,
    modelName: 'Groups'
})

module.exports = Groups