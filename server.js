const express = require("express");
const app = new express();
const conn = require("./app/database/conn");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
require('dotenv').config();
const models = require('./app/models/index');
const jwt = require("jsonwebtoken");
const handleSession  = require("./app/middlewares/handleSession");

//TODO: Configurar express
app.use(express.urlencoded({extended: true}));
app.use(express.json());


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
);

// Caso exista, Retorna a session do uusário
app.use(handleSession());

//TODO: Routes
app.use("", require("./app/router/accountRoutes"))
app.use("travel/", require("./app/router/travelRoutes"))
app.use("/group", require("./app/router/groupRoutes"))

//TODO: Configurar req.user

conn.sync()
    .then(() => {
        console.log(`- Servidor iniciado na porta: 3001`)
        app.listen(3001)
    })
    .catch((err) => console.error("[ERRO] - Erro ao subir aplicação, motivo: \n", err))

//TODO: Implementar docker para gerenciar contâiners da aplicação