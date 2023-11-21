const { DataTypes, Model } = require("sequelize")
const sequelize = require("./../../database/conn")
const Groups = require("./Groups")
const User = require("./User")

class MembersGroup extends Model{}

MembersGroup.init({
    user_id: {
        type: DataTypes.INTEGER,
        include: {
            model: User,
            foreignKey: "id",
        },
        require: true,
    },
    group_id: {
        type: DataTypes.INTEGER,
        include: {
            model: Groups,
            foreignKey: "id",
        },
        require: true,
    }
}, {
    sequelize,
    modelName: 'MembersGroup'
})

module.exports = MembersGroup