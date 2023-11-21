const createError = require("http-errors")
const bcrypt = require("bcryptjs")
const {User, Groups, MembersGroup} = require("./../models/index")
const { Sequelize } = require("sequelize")

module.exports = class GroupsController{
    /**
     * Retorna a lista de grupos ativos
     * @param {import { Request } from "express";} req - Requisição HTTP
     * @param {import { Response } from "express";} res - Resposta HTTP
     * @returns {Promise<object>}
     */
    static async index(req, res){
        const { limit, offset } = req.query

        const {count, rows: listGroups } =  await Groups.findAndCountAll({
            attributes: ['id', 'name', 'user_admin', 'status', 'createdAt'],
            limit: isNaN(Number(limit)) ? 20 : Number(limit),
            offset: isNaN(Number(offset)) ? 20 : Number(offset),
            order: [['id', 'desc'], ['status', 'desc'], ['createdAt', 'desc']],
            include: {
                model: MembersGroup,
                attributes: ['user_id', 'group_id', 'createdAt'],
                include: {
                    model: User,
                    attributes: ['name', 'email']

                }
            }
        })

        res.status(200).json({data: listGroups, meta: {count, limit: Number(limit), offset: Number(offset)}})
    }

    static async show(req, res){ }

    static async create(req, res){ }

    static async update(req, res){ }
}