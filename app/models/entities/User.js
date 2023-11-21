const { DataTypes, Model } = require("sequelize")
const sequelize = require("../../database/conn");
const Groups = require("./Groups");

class User extends Model{}

User.init({
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
}, {
    sequelize,
    modelName: "User"
});

User.hasMany(Groups, {foreignKey: "user_admin"})

module.exports = User