const { DataTypes } = require("sequelize")
const db = require("./../../database/conn")
const Groups = require("./Groups")
const User = require("./User")

const MembersGroup = db.define("members_group", {
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
})

module.exports = MembersGroup