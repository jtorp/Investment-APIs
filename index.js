const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const PORT = process.env.PORT || 5000
const app = express()



const sources =[
    {
        name:'Investemnt U',
        url:"https://investmentu.com/"
    },
    {
        name:'cointelegraph',
        url:"https://cointelegraph.com/"
    }

]


const infoLinks=[]

sources.forEach(source=>{
    axios.get(source.url)
    .then((res)=>{
        const html = res.data
        const $= cheerio.load(html)
        $('a:contains("IPO")', html).each(function(){
                    const title= $(this).text()
                    const link= $(this).attr("href")
                    infoLinks.push({
                        title,
                        link,
                        source: source.name
                    })
        })
    })
})
app.get("/", (req,res)=>{
    res.json(infoLinks)

})




app.listen(PORT, ()=>{
    console.log(`Server is listening on ${PORT}`)
})