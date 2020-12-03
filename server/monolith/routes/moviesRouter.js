const router = require('express').Router()
const Controller = require('../controllers/moviesController')


router.post('/', Controller.movieAdd)

router.get('/', Controller.movieList)

router.get('/:id', Controller.movieId)

router.put('/:id', Controller.moviePut)

router.delete('/:id', Controller.delete)


module.exports = router