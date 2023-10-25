const { DataTypes } = require("sequelize")
const db = require("../../database/conn");
const Groups = require("./Groups");

const User = db.define("User", {
    name: {
        type: DataTypes.STRING,
        require: true,
    },
    email: {
        type: DataTypes.STRING,
        require: true,
    },
    password: {
        type: DataTypes.STRING,
        require: true,
    },
    status: {
        type: DataTypes.BOOLEAN,
        require: false,
        defaultValue: true,
    },
    type: {
        type: DataTypes.INTEGER,
        require: false,
        defaultValue: 1,
    }
});

User.hasMany(Groups, {foreignKey: "user_admin"})

module.exports = User