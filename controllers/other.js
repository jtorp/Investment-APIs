const axios = require('axios')
const cheerio = require('cheerio')

async function getTechEtfs() {
  const techEtfs = [];
  const url = "https://etfdb.com/etfdb-category/technology-equities/#etfs&sort_name=assets_under_management&sort_order=desc&page=1"
  await axios(url)
    .then((response) => {
      const html_data = response.data;
      const $ = cheerio.load(html_data);

      const keys = [
        "symbol",
        "ETF Name",
        "Total Assets(thous)",
        "YTD %",
        "Avg.Vol",
        "Closing Price"
      ];

      $('#etfs > tbody > tr').each((index, element) => {

        let keyIndex = 0;
        const stockDetails = {}
        if (index < 30) {
          $(element).children().each((childId, childElem) => {
            const value = $(childElem).text();
            if (value && keyIndex <= 5) {
              stockDetails[keys[keyIndex]] = value
              keyIndex++

            }
          })
          techEtfs.push(stockDetails)
        }

      })
    });
  return techEtfs;
}

function getBlockChainEtfs() {
  const bc = []
  const url = "https://etfdb.com/themes/blockchain-etfs/"
  $('#complete-list > tbody > tr').each((index, element) => {
    console.log($(element).text());
  });
}
const getAllTechETFs = async (req, res) => {
  try {
    const etfs = await getTechEtfs();
    return res.status(200).json({
      data: etfs,
    });
  } catch (err) {
    return res.status(500).json({
      err: err.toString(),
    });
  }
}

module.exports = {
  getAllTechETFs
} 