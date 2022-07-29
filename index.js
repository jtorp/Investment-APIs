const express = require('express')
const PORT = process.env.PORT || 5000
const app = express()
const cors = require('cors');

const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handle');
const cryptoRouter = require('./routes/crypto');
const nftsRouter = require('./routes/nfts');
const faangRouter = require('./routes/faang');
 const etfRouter = require('./routes/other');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use(express.static('./public'))
app.use('/api/v1/crypto', cryptoRouter)
app.use('/api/v1/nfts', nftsRouter)
app.use('/api/v1/faangStocks', faangRouter)
app.use('/api/v1/techEtfs', etfRouter)


app.use(notFound)
app.use(errorHandlerMiddleware)


app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server is listening on ${PORT}`)
    }
})

