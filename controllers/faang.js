const axios = require("axios");
const cheerio = require("cheerio");

async function faangInfo() {
  const faang = [];
  const url = "https://finance.yahoo.com/u/yahoo-finance/watchlists/most-added"
  await axios(url)
    .then((response) => {
      const html_data = response.data;
      const $ = cheerio.load(html_data);

      const keys = [
        "Symbol",
        "Name",
        "Closing price",
        "Change",
        "Change %"
      ];

      $('tbody> tr.data-rowAAPL , tr.data-rowAMZN, tr.data-rowCOIN, tr.data-rowGOOG, tr.data-rowINTC, tr.data-rowMSFT, tr.data-rowMETA, tr.data-rowAMD, tr.data-rowNVDA, tr.data-rowV, tr.data-rowQCOM, tr.data-rowSPOT,  tr.data-rowBABA,  tr.data-rowTSLA,  tr.data-rowPYPL').each((index, element) => {

        let keyIndex = 0;
        const stockDetails = {}
        if (index < 30) {
          $(element).children().each((childId, childElem) => {
            const value = $(childElem).text();
            if (value && keyIndex <= 4) {
              stockDetails[keys[keyIndex]] = value
              keyIndex++

            }
          })
          faang.push(stockDetails)
        }

      })
    });
  return faang;
}




const getFaang = async (req, res) => {
  try {
    const faang = await faangInfo();
    return res.status(200).json({
      stocks: faang,
    });
  } catch (err) {
    return res.status(500).json({
      err: err.toString(),
    });
  }
}


module.exports = {
  getFaang
} 