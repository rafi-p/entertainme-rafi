import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client"

export const favoriteVars = makeVar(
    []
    )


 const client = new ApolloClient({
    // uri: 'http://localhost:4000',
    uri: 'http://54.179.167.101:4000',
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    favorites: {
                        read: () => {
                            return favoriteVars()
                        }
                    }
                }
            }
        }
    })
})



export default client