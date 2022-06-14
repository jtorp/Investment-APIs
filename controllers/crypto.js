let { crypto } = require('../crypto')
const axios = require('axios')
const cheerio = require('cheerio')
const asyncWrapper = require("../middleware/async")

const articles = []
//clean up titles
crypto.forEach(cryptoSource => {
    axios.get(cryptoSource.url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            $('a:contains("crypto")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')

                articles.push({
                    title,
                    url: cryptoSource.base + url,
                    source: cryptoSource.name
                })


            })

        })
})

const getSourceByName = asyncWrapper(async (req, res) => {
    const sourceName = req.params.sourceName
    const sourceUrl = crypto.filter(item => item.name == sourceName)[0].url
    const sourceBase = crypto.filter(item => item.name == sourceName)[0].base


    axios.get(sourceUrl)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)


            const articlesBySourceName = []
            $('a:contains("crypto")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')

                articlesBySourceName.push({
                    title,
                    url: sourceBase + url
                })
            })
            res.json(articlesBySourceName)

        }).catch(error => console.log(error))
})

const getSources = (req, res) => {
    res.status(200).json({ success: true, data: articles })
}

module.exports = {
    getSources,
    getSourceByName
} 