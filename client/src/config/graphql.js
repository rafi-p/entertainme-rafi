import { ApolloClient, InMemoryCache, IntrospectionFragmentMatcher  } from "@apollo/client"

 const client = new ApolloClient({
    uriL: 'http://localhost:4000',
    cache: new InMemoryCache()
})



export default client