const { ApolloServer, gql, makeExecutableSchema} = require('apollo-server')
const movieSchema = require('./schema/movieSchema')
const serieSchema = require('./schema/serieSchema')

const typeDefs = gql`
  type Query
  type Mutation
`

const schema = makeExecutableSchema({
    typeDefs : [
        typeDefs,
        movieSchema.typeDefs,
        serieSchema.typeDefs
    ],
    resolvers : [
        movieSchema.resolvers,
        serieSchema.resolvers
    ]
})

const server = new ApolloServer({
    schema
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})