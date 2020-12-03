const router = require('express').Router()
const tvSeriesRouter = require('./tvSeriesRouter')

router.use('/tv', tvSeriesRouter)

module.exports = router