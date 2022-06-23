let { memestocksources } = require('../memestock-sources')
const axios = require('axios')
const cheerio = require('cheerio')

const memeNews = [];

memestocksources.forEach(memeSources => {
    axios.get(memeSources.url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            $('a:contains("meme")', html).each((index, element) => {
                const title = $(element).text()
                    .trim().replace(/[\n\t]/g, "");
                const url = $(element).attr('href')
                if (title.length > 10) {
                    memeNews.push({
                        title,
                        url: memeSources.base + url,
                        source: memeSources.name

                    })

                }

            })

        }).catch(error => console.log(error))
})


const getAllMemeStocksSources = (req, res) => {
    res.status(200).json({ data: memeNews })
}

module.exports = {
    getAllMemeStocksSources
}


// Meme stocks are equity securities of companies that exhibit a combination of elevated social media activity and high short interest, both of which are indicators of market sentiment.