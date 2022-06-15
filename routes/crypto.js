const express = require('express')
const router = express.Router()

const {
  getCryptoSources, getSourceByName
} = require('../controllers/crypto')


router.route('/').get(getCryptoSources)
router.route('/:sourceName').get(getSourceByName)

module.exports = router