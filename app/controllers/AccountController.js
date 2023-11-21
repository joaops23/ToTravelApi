const createError = require("http-errors")
const bcrypt = require("bcryptjs")
const {User} = require("./../models/index")
const { Sequelize } = require("sequelize")
const jwt = require("jsonwebtoken")

module.exports = class AccountController{
    static async login(req, res){
        const { email, password } = req.body

        const user = await User.findOne({where: {email: email}, raw: true})
        if(!user)
            return res.status(403).json({message: "Usuário não encontrado. Email inválido!"})

        
        const passwordMatch = bcrypt.compareSync(password, user.password)
        if(!passwordMatch)
        return res.status(403).json({message: "Senha inválida. Tente novamente!"})

        req.session.userId = user.id
        req.session.save(() => {
            //geração do token
            const token = jwt.sign({id: user.id}, process.env.SECRET, {
                expiresIn: process.env.SECRET_EXPIRATION
            })
            res.status(200).json({data: {id: user.id, name: user.name, token, auth: true,}})
        })
    }
    
    static async register(req, res){
        const { email, password, name } = req.body

        if(!email || !password || !name)
            return res.status(403).json({message: "Dados fornecidos inválidos! Corrija e tente novamente!"})

        //valida se o usuário existe
        const checkIfUserExists = await User.findAll({where: {email: email}, raw: true})        
        if(checkIfUserExists.length)
            return res.status(401).json({message: "Usuário já cadastrado! Realizar o login"})

        //se não existir, encripta a senha e cadastra no banco
        const salt = await bcrypt.genSaltSync(10)
        const hash_password = bcrypt.hashSync(password, salt)

        const user = {
            name,
            email,
            password: hash_password
        }

        try{
            const transaction = await Sequelize.transaction
            const createdUser = await User.create(user, { transaction })

            req.session.userId = createdUser.id
            req.session.save(() => {
                res.status(201).json({message: "Usuário cadastrado com sucesso!"})
            })

        }catch(err) {
            console.log("Erro ao incluir usuário, motivo:\n", err)
        }
    }

    static async logout(req, res) { // Elimina a session do usuário logado
        req.session.destroy(() => {
            res.status(200).json({message: "success"})
        })
    }
}