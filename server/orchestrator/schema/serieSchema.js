const { gql } = require("apollo-server")
const axios = require("axios")
const tvURL = 'http://54.179.167.101:5002/tv'
const Redis = require('ioredis')
const redis = new Redis()

const typeDefs = gql`

    type TV {
        _id: ID
        title: String
        overview: String
        poster_path: String
        popularity: Float
        tags: [String]
    }

    extend type Query {

        series: [TV]
        serie(_id:ID): TV
    }

    input newTV {
        title: String!
        overview: String!
        poster_path: String!
        popularity: Float!
        tags: [String!]
    }

    extend type Mutation {

        addSerie(data: newTV): TV
        updateSerie(_id:ID, data: newTV): TV
        removeSerie(_id:ID): TV
    }
`;


const resolvers = {
    Query: {
        //-----------TV-------------------

        series: async () => {
            try {
                const entertainme = JSON.parse(await redis.get("series"))
                // console.log(entertainme)
                if(entertainme) {
                    return entertainme
                } else {
                    const {data} = await axios({
                        url: tvURL,
                        method: 'GET'
                    })
                    redis.set("series", JSON.stringify(data))
                    return data
                }
            } catch (error) {
                console.log(error)
            }
        },
        serie: async (parent, args, context, info) => {
            try {
                const {_id} = args
                const {data} = await axios({
                    url: tvURL + `/${_id}`,
                    method: 'GET'
                })
                return data
            } catch (error) {
                console.log(error)
            }

        }
    }
    ,
    Mutation: {
        //-----------TV-------------------

        addSerie: async (parent, args, context, info) => {
            try {
                const {title, overview, poster_path, popularity, tags} = args.data
                const {data} = await axios ({
                    url: tvURL,
                    method: 'POST',
                    data: {
                        title,
                        overview,
                        poster_path,
                        popularity,
                        tags
                    }
                })
                redis.del('series')
                return data.ops[0]
            } catch (error) {
                console.log(error)
            }
        },
        updateSerie: async (parent, args, context, info) => {
            try {
                const {_id} = args
                const {title, overview, poster_path, popularity, tags} = args.data
                const {data} = await axios ({
                    url: tvURL + `/${_id}`,
                    method: 'PUT',
                    data: {
                        title,
                        overview,
                        poster_path,
                        popularity,
                        tags
                    }
                })
                redis.del('series')
                // console.log(data)
                return data.value
            } catch (error) {
                console.log(error)
            }
        },
        removeSerie: async (parent, args, context, info) => {
            try {
                const {_id} = args
                const {data} = await axios ({
                    url: tvURL + `/${_id}`,
                    method: 'DELETE'
                })
                redis.del('series')
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