const axios = require('axios')
const moviesURL = 'http://localhost:3001/movies'

class MovieController {
    static async movieAdd(req, res) {
        try {
            const inputMovie = {
                title: req.body.title,
                overview: req.body.overview,
                poster_path: req.body.poster_path,
                popularity: req.body.popularity,
                tags: req.body.tags
            }
            console.log(inputMovie)
            const newMovie = await Movie.create(inputMovie)
            res.status(201).json(newMovie)
        } catch (error) {
            res.send(error)
        }
    }
    static async movieList(req, res) {
        try {

            const{ data } = await axios({
                url: moviesURL,
                method: "GET"
            })
            res.status(200).json(data)
        } catch (error) {
            res.send(error)
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

    static async delete(req, res) {
        try {
            let id = req.params.id
            const updateMovie = {
                title: req.body.title,
                overview: req.body.overview,
                poster_path: req.body.poster_path,
                popularity: req.body.popularity,
                tags: req.body.tags
            }
            const dataMovie = await Movie.remove(id, updateMovie)
            // console.log(dataMovies)
            res.status(200).json(dataMovie)
        } catch (error) {
            console.log(error)
            res.status(500).json({
              message : "Internal Server Error"
            })
        }
    }
}


module.exports = MovieController