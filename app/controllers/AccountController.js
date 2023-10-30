const {createHttpError} = require("http-errors")
const bcrypt = require("bcryptjs")
const {User} = require("./../models/index")
const { Sequelize } = require("sequelize")

module.exports = class AccountController{
    static login(req, res){
        res.json("Teste")
    }
    static async register(req, res){
        const { email, password, name } = req.body

        if()

        //valida se o usuário existe
        const checkIfUserExists = await User.findAll({where: {email: email}, raw: true})
        if(checkIfUserExists.length)
            throw createHttpError(401, "Usuário já existente na base de dados")

        //se não existir, encripta a senha e cadastra no banco
        const salt = await bcrypt.genSaltSync(10)
        const hash_password = bbcrypt.hashSync(password, salt)

        const user = {
            name,
            email,
            password: hash_password
        }

        try{
            const transaction = await Sequelize.transaction()
            const createdUser = await User.create(user, { transaction })
            req.session.userId = createdUser.id
            req.session.save(() => {
                res.status(201).json({message: "Usuário cadastrado com sucesso!"})
            })

        }catch(err) {
            console.log("Erro ao incluir usuário, motivo:\n", err)
        }
    }
}