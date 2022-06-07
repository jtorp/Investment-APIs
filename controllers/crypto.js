let { crypto } = require('../crypto')

const getSources = (req, res) => {
    res.status(200).json({ success: true, data: crypto })
}

module.exports = {
    getSources
} 