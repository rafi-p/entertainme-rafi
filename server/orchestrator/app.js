const express = require('express')
const router = require('./routes/index')
const app = express()
const port = 3000
const cors = require("cors")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', router)

app.listen(port, () => {
    console.log(`Orchestrator listening at http://localhost:${port}`)
})