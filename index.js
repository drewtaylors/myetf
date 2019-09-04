const express = require('express')
const app = express()

const fundRouter = require('./routers/fund')
const stockRouter = require('./routers/stock')

const PORT = 8000

app.use(express.json())
app.use(fundRouter)
app.use(stockRouter)

app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(PORT, () => {
    console.log(`myETF listening on port ${PORT}`)
})