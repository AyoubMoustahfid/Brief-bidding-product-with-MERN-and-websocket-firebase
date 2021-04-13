const express = require('express');

const {showOwner} = require('../controllers/homeController')

const router = express.Router()

router.get('/', showOwner);

module.exports = router