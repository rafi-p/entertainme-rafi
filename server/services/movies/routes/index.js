const router = require('express').Router()
const moviesRouter = require('./moviesRouter')

router.use('/movies', moviesRouter)

module.exports = router