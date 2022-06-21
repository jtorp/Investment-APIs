let { crypto } = require('../crypto-sources')
const axios = require('axios')
const cheerio = require('cheerio')
const asyncWrapper = require("../middleware/async")
const { config } = require('nodemon')

const cryptoNewsArticles = []

crypto.forEach(cryptoSource => {
    axios.get(cryptoSource.url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            $('.entry-title, .td-module-title, .ipm-category-title, .list-title, .top-story__title, .instrument-stories__title, .story-row__title, .list-title, .post-card__header, .article__headline, .js-article-item, .articleItem, .textDiv, .mdc-grid-item__content, .article-description, .headline, .js-teaser-headline, .headline--scale-7, .headline--scale-3, .WSJTheme--headline--unZqjb45').children('a').each((index, element) => {
                const title = $(element).text()
                    .trim().replace(/[\n\t]/g, "");
                const url = $(element).attr('href')

                if (title.length > 10 && title.toLowerCase().includes("crypto")) {
                    cryptoNewsArticles.push({
                        title,
                        url: cryptoSource.base + url,
                        source: cryptoSource.name

                    })

                };

            })

        }).catch(error => console.log(error))
})



const getCryptoSources = async (req, res) => {
    res.status(200).json({ data: cryptoNewsArticles })
}


const getSourceByName = asyncWrapper(async (req, res) => {
    const name = req.params.name
    const sourceUrl = crypto.filter(item => item.name == name)[0].url
    const sourceBase = crypto.filter(item => item.name == name)[0].base


    axios.get(sourceUrl)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const articlesBySourceName = []

            $(`a`, html).each((index, element) => {

                const title = $(element).text().trim().replace(/\\n/g, '')
                const url = $(element).attr('href')

                if (title.length > 20 && title.toLowerCase().includes("crypto")) 
                articlesBySourceName.push({
                    title,
                    url: sourceBase + url,
                    source: name
                })
            })
            res.json({ data: articlesBySourceName })

        }).catch(error => console.log(error))
})


module.exports = {
    getCryptoSources,
    getSourceByName
} 