const express = require('express')
const router = express.Router()


const {getFaang} = require('../controllers/faang')
router.route('/').get(getFaang)

module.exports = router