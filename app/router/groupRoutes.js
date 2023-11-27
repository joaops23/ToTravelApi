const express = require('express');
const router = express.Router();
const Travels = require("../models");
const GroupsController = require("../controllers/GroupsController");
const verifyJWT = require('../middlewares/verifyJWT');

router.get('/', verifyJWT, GroupsController.index)
router.get('/:id', verifyJWT, GroupsController.show)
router.post('/', verifyJWT, GroupsController.create)
router.patch('/:id', verifyJWT, GroupsController.update)
module.exports = router;