const express = require('express')
const router = express.Router()


const {getAllTechETFs} = require('../controllers/other')
router.route('/').get(getAllTechETFs)

module.exports = router