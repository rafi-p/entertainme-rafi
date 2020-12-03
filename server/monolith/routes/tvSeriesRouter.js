const router = require('express').Router()
const Controller = require('../controllers/tvSeriesController')


router.post('/', Controller.tvAdd)

router.get('/', Controller.tvList)

router.get('/:id', Controller.tvId)

router.put('/:id', Controller.tvPut)

router.delete('/:id', Controller.delete)


module.exports = router