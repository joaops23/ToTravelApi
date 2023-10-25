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

module.exports = models