const User = require("./entities/User")
const Groups = require("./entities/Groups")
const MembersGroup = require("./entities/MembersGroup")
const Travels = require("./entities/Travels")
const Vehicle = require("./entities/Vehicle")

const models = {
    User,
    Groups,
    MembersGroup,
    Travels,
    Vehicle
}

Groups.hasMany(MembersGroup, {foreignKey: "group_id"})
MembersGroup.hasMany(User, {foreignKey: "id"})

module.exports = models