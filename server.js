const express = require("express")
const app = new express()
const conn = require("./app/database/conn")
const session = require("express-session")
const FileStore = require("session-file-store")(session)
require('dotenv').config()
const models = require('./app/models/index')

//TODO: Configurar express
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//TODO: Routes
app.use("", require("./app/router/accountRoutes"))


//TODO: Inicializar session
app.use(
    session({
        name:"session",
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized:false,
        srote: new FileStore({
            logFn: () => {},
            path: require('path').join(require("os").tmpdir(), 'sessions'),
        }),
        cookie: {
            maxAge: 360000, // 1 dia
            expires: new Date(Date.now() + 360000),
            httpOnly: true //rodará sem certificado https
        }
    })
)

// Caso exista, Retorna a session do uusário
app.use((req, res, next) => {
    if(req.session.userId) {
        res.locals.session = req.session
    }
    next()
})

//TODO: Configurar req.user

conn.sync()
    .then(() => {
        console.log(`- Servidor iniciado na porta: 3000`)
        app.listen(3000)
    })
    .catch((err) => console.error("[ERRO] - Erro ao subir aplicação, motivo: \n", err))