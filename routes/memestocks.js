const express = require('express')
const router = express.Router()

const {
    getAllMemeStocksSources,
} = require('../controllers/memestocks')


router.route('/').get(getAllMemeStocksSources)

module.exports = router