const express = require('express')
const router = express.Router()

const {
  getCryptoSources, getSourceByName
} = require('../controllers/crypto')


router.route('/').get(getCryptoSources)
router.route('/:name').get(getSourceByName)

module.exports = router