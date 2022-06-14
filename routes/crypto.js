const express = require('express')
const router = express.Router()

const {
  getSources,getSourceByName
} = require('../controllers/crypto')


router.route('/').get(getSources)
router.route('/:sourceName').get(getSourceByName)

module.exports = router