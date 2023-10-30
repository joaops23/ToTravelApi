const express = require('express');
const router = express.Router();
const User = require("../models");
const AccountController = require('../controllers/AccountController');

router.post('/login', AccountController.login)
router.post('/register', AccountController.register)
module.exports = router;