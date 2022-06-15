const express = require('express')
const router = express.Router()

const {
  getAllNftSources,
} = require('../controllers/nfts')


router.route('/').get(getAllNftSources)

module.exports = router