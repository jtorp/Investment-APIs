let { crypto } = require('../crypto')
const axios = require('axios')
const cheerio = require('cheerio')

const articles = []
//clean up titles
crypto.forEach(c => {

    axios.get(c.url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            $('a:contains("crypto")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')

                articles.push({
                    title,
                    url: c.base + url,
                    source: c.name
                })
            })


        })
})

var len = articles.length;
console.log("Articles Length", len)


const getSources = (req, res) => {
    res.status(200).json({ success: true, data: articles })
}

module.exports = {
    getSources
} 