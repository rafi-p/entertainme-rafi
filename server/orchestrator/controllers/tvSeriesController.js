const axios = require('axios')

class TvSeriesController {
    static async tvAdd(req, res) {
        try {
            const inputTV = {
                title: req.body.title,
                overview: req.body.overview,
                poster_path: req.body.poster_path,
                popularity: req.body.popularity,
                tags: req.body.tags
            }
            console.log(inputTV)
            const newTV = await TV.create(inputTV)
            res.status(201).json(newTV)
        } catch (error) {
            console.log(error)
            res.status(500).json({
              message : "Internal Server Error"
            })
        }
    }
    static async tvList(req, res) {
        try {
            const dataTV = await TV.find()
            // console.log(dataTV)
            res.status(200).json(dataTV)
        } catch (error) {
            console.log(error)
            res.status(500).json({
              message : "Internal Server Error"
            })
        }
    }
    static async tvId(req, res) {
        try {
            let id = req.params.id
            const dataTV = await TV.findById(id)
            // console.log(dataTVs)
            res.status(200).json(dataTV)
        } catch (error) {
            console.log(error)
            res.status(500).json({
              message : "Internal Server Error"
            })
        }
    }
    static async tvPut(req, res) {
        try {
            let id = req.params.id
            const updateTV = {
                title: req.body.title,
                overview: req.body.overview,
                poster_path: req.body.poster_path,
                popularity: req.body.popularity,
                tags: req.body.tags
            }
            const resp = await TV.update(id, updateTV)
            res.status(200).json(resp)
        } catch (error) {
            console.log(error)
            res.status(500).json({
              message : "Internal Server Error"
            })
        }
    }

    static async delete(req, res) {
        try {
            let id = req.params.id
            const updateTV = {
                title: req.body.title,
                overview: req.body.overview,
                poster_path: req.body.poster_path,
                popularity: req.body.popularity,
                tags: req.body.tags
            }
            const dataTV = await TV.remove(id, updateTV)
            // console.log(dataTVs)
            res.status(200).json(dataTV)
        } catch (error) {
            console.log(error)
            res.status(500).json({
              message : "Internal Server Error"
            })
        }
    }
}


module.exports = TvSeriesController