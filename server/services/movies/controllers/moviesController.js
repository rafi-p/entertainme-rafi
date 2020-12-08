const Movie = require('../models/movie')

class MovieController {
    static async movieAdd(req, res) {
        try {
            const inputMovie = {
                title: req.body.title,
                overview: req.body.overview,
                poster_path: req.body.poster_path,
                popularity: req.body.popularity,
                tags: req.body.tags,
                favorite: false
            }
            // console.log(inputMovie)
            const newMovie = await Movie.create(inputMovie)
            console.log(newMovie)
            res.status(201).json(newMovie)
        } catch (error) {
            console.log(error)
            res.status(500).json({
              message : "Internal Server Error"
            })
        }
    }
    static async movieList(req, res) {
        try {
            const dataMovies = await Movie.find()
            // console.log(dataMovies)
            res.status(200).json(dataMovies)
        } catch (error) {
            console.log(error)
            res.status(500).json({
              message : "Internal Server Error"
            })
        }
    }
    static async movieId(req, res) {
        try {
            let id = req.params.id
            const dataMovie = await Movie.findById(id)
            // console.log(dataMovies)
            res.status(200).json(dataMovie)
        } catch (error) {
            console.log(error)
            res.status(500).json({
              message : "Internal Server Error"
            })
        }
    }
    static async moviePut(req, res) {
        try {
            let id = req.params.id
            const updateMovie = {
                title: req.body.title,
                overview: req.body.overview,
                poster_path: req.body.poster_path,
                popularity: req.body.popularity,
                tags: req.body.tags
            }
            const resp = await Movie.update(id, updateMovie)
            res.status(200).json(resp)
        } catch (error) {
            console.log(error)
            res.status(500).json({
              message : "Internal Server Error"
            })
        }
    }

    static async moviePatch(req, res) {
        try {
            let id = req.params.id
            const patchMovie = {
                favorite: req.body.favorite
            }
            const resp = await Movie.update(id, patchMovie)
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
            const movieDeleted = await Movie.findById(id)
            const dataMovie = await Movie.remove(id)
            console.log(movieDeleted)
            res.status(200).json(movieDeleted)
        } catch (error) {
            console.log(error)
            res.status(500).json({
              message : "Internal Server Error"
            })
        }
    }
}


module.exports = MovieController