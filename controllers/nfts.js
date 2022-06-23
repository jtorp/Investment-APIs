
let { nft } = require('../nft-sources')
const axios = require('axios')
const cheerio = require('cheerio')

const nftNewsArticles = [];

nft.forEach(nftSource => {
    axios.get(nftSource.url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            $('.entry-title, .td-module-title, .story-row__title, .latest-news__title, .col-12, .col-md-7,.ipm-category-title, .post-card__header, .post-card-inline__header, .jeg_post_title, .title, .mh-posts-list-title, .TextAlignModule _2jPEQ _1rI0O, .card-title, .two-line-ellipsis, .media-heading, . entry-title, .mvp-blog-story-wrap ').children('a').each((index, element) => {
                const title = $(element).text()
                    .trim().replace(/[\n\t]/g, "");
                const url = $(element).attr('href')

                if (title.length > 10 && title.includes("NFT")) {
                    nftNewsArticles.push({
                        title,
                        url: nftSource.base + url,
                        source: nftSource.name
                    })
                };
            })
        }).catch(error => console.log(error))
})


const getAllNftSources = (req, res) => {
    res.status(200).json({ data: nftNewsArticles })
}


module.exports = {
    getAllNftSources
} 