const express = require('express')
const router = express.Router()

const {
  getSources,
} = require('../controllers/nfts')


router.route('/').get(getSources)

module.exports = router