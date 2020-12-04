const axios = require('axios')
const moviesURL = 'http://localhost:3001/movies'
const tvURL = 'http://localhost:3002/tv'
const Redis = require('ioredis')
const redis = new Redis()

class EntertainmeController {
    static async entertainmeAdd(req, res) {
        try {
            const input = {
                title: req.body.title,
                overview: req.body.overview,
                poster_path: req.body.poster_path,
                popularity: req.body.popularity,
                tags: req.body.tags
            }

            const movie = await axios({
                url: moviesURL,
                method: "POST",
                data: input
            })

            const tv = await axios({
                url: tvURL,
                method: "POST",
                data: input
            })

            redis.del('entertainme')

            res.status(201).json({
                movies: movie.data,
                tvSeries: tv.data
            })
        } catch (error) {
            res.send(error)
        }
    }
    static async entertainmeList(req, res) {
        try {
            const entertainme =  JSON.parse(await redis.get("entertainme"))

            if(entertainme) {
                res.status(200).json(entertainme)
            } else {
                const movie = await axios({
                    url: moviesURL,
                    method: "GET"
                })

                const tv = await axios({
                    url: tvURL,
                    method: "GET"
                })
                res.status(200).json({
                    movies: movie.data,
                    tvSeries: tv.data
                })

                redis.set("entertainme", JSON.stringify({
                    movies: movie.data,
                    tvSeries: tv.data
                }))
            }
        } catch (error) {
            res.send(error)
        }
    }
    // static async movieId(req, res) {
    //     try {
    //         let id = req.params.id
    //         const dataMovie = await Movie.findById(id)
    //         // console.log(dataMovies)
    //         res.status(200).json(dataMovie)
    //     } catch (error) {
    //         console.log(error)
    //         res.status(500).json({
    //           message : "Internal Server Error"
    //         })
    //     }
    // }
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

    // static async delete(req, res) {
    //     try {
    //         let id = req.params.id
    //         const updateMovie = {
    //             title: req.body.title,
    //             overview: req.body.overview,
    //             poster_path: req.body.poster_path,
    //             popularity: req.body.popularity,
    //             tags: req.body.tags
    //         }
    //         const dataMovie = await Movie.remove(id, updateMovie)
    //         // console.log(dataMovies)
    //         res.status(200).json(dataMovie)
    //     } catch (error) {
    //         console.log(error)
    //         res.status(500).json({
    //           message : "Internal Server Error"
    //         })
    //     }
    // }
}


module.exports = EntertainmeController