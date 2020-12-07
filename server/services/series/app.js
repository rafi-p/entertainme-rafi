const express = require('express')
const router = require('./routes/index')
const app = express()
const port = 5002

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', router)

app.listen(port, () => {
    console.log(`Series listening at http://localhost:${port}`)
})