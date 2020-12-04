const router = require('express').Router()
const entertainmeRouter = require('./entertainmeRouter')
// const moviesRouter = require('./moviesRouter')
// const tvSeriesRouter = require('./tvSeriesRouter')

router.use('/entertainme', entertainmeRouter)
// router.use('/movies', moviesRouter)
// router.use('/tv', tvSeriesRouter)

module.exports = router