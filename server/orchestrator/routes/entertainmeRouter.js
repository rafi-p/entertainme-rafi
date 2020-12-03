const router = require('express').Router()
const Controller = require('../controllers/entertainmeController')


// router.post('/', Controller.movieAdd)

router.get('/', Controller.entertainmeList)

// router.get('/:id', Controller.movieId)

// router.put('/:id', Controller.moviePut)

// router.delete('/:id', Controller.delete)


module.exports = router