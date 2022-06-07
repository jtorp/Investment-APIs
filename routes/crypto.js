const express = require('express')
const router = express.Router()

const {
  getSources,
} = require('../controllers/crypto')


router.route('/').get(getSources)

module.exports = router