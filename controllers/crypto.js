let { crypto } = require('../crypto-sources')
const axios = require('axios')
const cheerio = require('cheerio')
const asyncWrapper = require("../middleware/async")

const cryptoNewsArticles = []

crypto.forEach(cryptoSource => {
    axios.get(cryptoSource.url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            const crypto = $('a:contains("crypto")', html);
            const cryptoCapital = $('a:contains("Crypto")', html)
            const searchTerm = $(crypto || cryptoCapital)

            $(searchTerm).each(function () {
                const title = $(this).text().trim().replace(/[\n\t]/g, "");
                const url = $(this).attr('href')


                cryptoNewsArticles.push({
                    title,
                    url: cryptoSource.base + url,
                    source: cryptoSource.name
                })


            })

        })
})

//TODO sanitize titles for unique records 


const getCryptoSources = async (req, res) => {
    res.status(200).json({ data: cryptoNewsArticles })
}


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

                const title = $(this).text().trim().replace(/\\n/g, '')
                const url = $(this).attr('href')

                articlesBySourceName.push({
                    title,
                    url: sourceBase + url,
                    source: sourceName
                })
            })
            res.json({ data: articlesBySourceName })

        }).catch(error => console.log(error))
})


module.exports = {
    getCryptoSources,
    getSourceByName
} 