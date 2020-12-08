const { gql } = require("apollo-server")
const axios = require("axios")
const moviesURL = 'http://localhost:5001/movies'
const Redis = require('ioredis')
const redis = new Redis()

const typeDefs = gql`

    type Movie {
        _id: ID
        title: String
        overview: String
        poster_path: String
        popularity: Float
        tags: [String]
        favorite: Boolean
    }

    extend type Query {
        movies: [Movie]
        movie(_id:ID): Movie
    }

    input newMovie {
        title: String!
        overview: String!
        poster_path: String!
        popularity: Float!
        tags: [String!]
        favorite: Boolean
    }

    input newFavorite {
        favorite: Boolean
    }

    extend type Mutation {
        addMovie(data: newMovie): Movie
        updateMovie(_id:ID, data: newMovie): Movie
        patchMovie(_id:ID, data: newFavorite): Movie
        removeMovie(_id:ID): Movie
    }
`;


const resolvers = {
    Query: {

        //-----------MOVIE-------------------

        movies: async () => {
            try {
                const entertainme = JSON.parse(await redis.get("movies"))
                // console.log(entertainme)
                if(entertainme) {
                    return entertainme
                } else {
                    const {data} = await axios({
                        url: moviesURL,
                        method: 'GET'
                    })
                    redis.set("movies", JSON.stringify(data))
                    return data
                }
            } catch (error) {
                console.log(error)
            }



        },
        movie: async (parent, args, context, info) => {
            try {

                const {_id} = args

                // console.log(_id)
                const {data} = await axios({
                    url: moviesURL + `/${_id}`,
                    method: 'GET'
                })
                return data
            } catch (error) {
                console.log(error)
            }

        },

    }
    ,
    Mutation: {

        //-----------MOVIE-------------------

        addMovie: async (parent, args, context, info) => {
            try {
                const {title, overview, poster_path, popularity, tags} = args.data
                const {data} = await axios ({
                    url: moviesURL,
                    method: 'POST',
                    data: {
                        title,
                        overview,
                        poster_path,
                        popularity,
                        tags
                    }
                })
                redis.del('movies')
                return data.ops[0]
            } catch (error) {
                console.log(error)
            }
        },
        updateMovie: async (parent, args, context, info) => {
            try {
                const {_id} = args
                // console.log(_id, 'ini di movieSchema')
                // console.log(args.data)
                const {title, overview, poster_path, popularity, tags} = args.data
                const {data} = await axios ({
                    url: moviesURL + `/${_id}`,
                    method: 'PUT',
                    data: {
                        title,
                        overview,
                        poster_path,
                        popularity,
                        tags
                    }
                })
                redis.del('movies')
                // console.log(data, 'ini data dari updateMovie')
                return data.value
            } catch (error) {

                console.log(error)
            }
        },
        patchMovie: async (parent, args, context, info) => {
            try {
                const {_id} = args
                // console.log(_id, 'ini di movieSchema')
                // console.log(args.data)
                const {favorite} = args.data
                const {data} = await axios ({
                    url: moviesURL + `/${_id}`,
                    method: 'PATCH',
                    data: {
                        favorite
                    }
                })
                redis.del('movies')
                // console.log(data, 'ini data dari updateMovie')
                return data.value
            } catch (error) {

                console.log(error)
            }
        },
        removeMovie: async (parent, args, context, info) => {
            try {
                const {_id} = args
                const {data} = await axios ({
                    url: moviesURL + `/${_id}`,
                    method: 'DELETE'
                })
                redis.del('movies')
                console.log(data)
                return data
            } catch (error) {
                console.log(error)
            }
        }
    }
}

module.exports = {
    typeDefs,
    resolvers
  }