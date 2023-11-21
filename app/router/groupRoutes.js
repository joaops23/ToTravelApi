const express = require('express');
const router = express.Router();
const Travels = require("../models");
const GroupsController = require("../controllers/GroupsController");
const verifyJWT = require('../middlewares/verifyJWT');

router.get('/', verifyJWT, GroupsController.index)
router.get('/:id', GroupsController.show)
router.post('/', GroupsController.create)
router.patch('/:id', GroupsController.update)
module.exports = router;