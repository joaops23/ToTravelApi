const createError = require("http-errors")
const bcrypt = require("bcryptjs")
const {User, Travels} = require("./../models/index")
const { Sequelize } = require("sequelize")

module.exports = class AccountController{
    static async index(req, res){ }

    static async show(req, res){ }

    static async create(req, res){ }

    static async update(req, res){ }
}