const express = require('express');
const router = express.Router();
const Travels = require("../models");
const TravelsController = require("../controllers/TravelsController")

router.get('/', TravelsController.index)
router.get('/:id', TravelsController.show)
router.post('/', TravelsController.create)
router.patch('/:id', TravelsController.update)
module.exports = router;