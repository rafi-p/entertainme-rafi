import { gql } from '@apollo/client'

export const GET_MOVIES = gql`
  query getMovies {
    movies {
        _id
        title
        overview
        poster_path
        popularity
        tags
    }
  }
`
export const GET_MOVIE = gql`

  query getMovie($id: ID) {
    movie (_id: $id) {
        _id
        title
        overview
        poster_path
        popularity
        tags
    }
  }
`

// export const ADD_MOVIE = gql`

//   mutation addMovie($title: String!, $overview: String!, $poster_path: String!, $popularity: Float!, $tags: [String!]) {
//     movie (
//         title: $title,
//         overview: $overview,
//         poster_path: $poster_path,
//         popularity: $popularity,
//         tags: $tags
//         ) {
//             _id
//             title
//             overview
//             poster_path
//             popularity
//             tags
//     }
//   }
// `

export const ADD_MOVIE = gql`

  mutation addMovie($data : newMovie) {
    addMovie (
        data: $data
        ) {
            _id
            title
            overview
            poster_path
            popularity
            tags
    }
  }
`


export const UPDATE_MOVIE = gql`

  mutation updateMovie($id : ID, $data : updateMovie) {
    updateMovie (
        _id: $id,
        data: $data
        ) {
            _id
            title
            overview
            poster_path
            popularity
            tags
    }
  }
`

export const REMOVE_MOVIE = gql`

  mutation removeMovie($id : ID) {
    removeMovie (_id: $id) {
        _id
        title
        overview
        poster_path
        popularity
        tags
    }
  }
`

export const GET_SERIES = gql`
  query getSeries {
    series {
        _id
        title
        overview
        poster_path
        popularity
        tags
    }
  }
`