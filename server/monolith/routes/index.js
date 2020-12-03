const router = require('express').Router()
const moviesRouter = require('./moviesRouter')
const tvSeriesRouter = require('./tvSeriesRouter')

router.use('/movies', moviesRouter)
router.use('/tv', tvSeriesRouter)

module.exports = router