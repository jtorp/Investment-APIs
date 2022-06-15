
let { nft } = require('../nft-sources')
const axios = require('axios')
const cheerio = require('cheerio')

const nftNewsArticles = [];


nft.forEach(nftSource => {
    axios.get(nftSource.url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            $('a:contains("NFT")', html).each(function () {
                const title = $(this).text().trim();
                const url = $(this).attr('href')
                if (title.length < 11) {
                    return
                } else {
                    nftNewsArticles.push({
                        title,
                        url: nftSource.base + url,
                        source: nftSource.name
                    })
                }

            })

        })

})





const getAllNftSources = (req, res) => {
    res.status(200).json({ data: nftNewsArticles })
}


module.exports = {
    getAllNftSources
} 