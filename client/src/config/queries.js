import { gql } from '@apollo/client'

export const GET_ALL = gql`
{
  movies {
      _id
      title
      overview
      poster_path
      popularity
      tags
      favorite
  }
  series {
    _id
    title
    overview
    poster_path
    popularity
    tags
    favorite
  }
}
`

export const GET_MOVIES = gql`
  query getMovies {
    movies {
        _id
        title
        overview
        poster_path
        popularity
        tags
        favorite
    }
  }
`
export const GET_MOVIE = gql`

  query getMovie($_id: ID) {
    movie (_id: $_id) {
        _id
        title
        overview
        poster_path
        popularity
        tags
        favorite
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
            favorite
    }
  }
`


export const UPDATE_MOVIE = gql`

  mutation updateMovie($_id : ID, $data : newMovie) {
    updateMovie (
        _id: $_id,
        data: $data
        ) {
            _id
            title
            overview
            poster_path
            popularity
            tags
            favorite
    }
  }
`

export const PATCH_MOVIE = gql`

  mutation patchMovie($_id : ID, $data : newFavorite) {
    patchMovie (
        _id: $_id,
        data: $data
        ) {
            _id
            title
            overview
            poster_path
            popularity
            tags
            favorite
    }
  }
`

export const REMOVE_MOVIE = gql`

  mutation removeMovie($_id : ID) {
    removeMovie (_id: $_id) {
        _id
        title
        overview
        poster_path
        popularity
        tags
        favorite
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

export const GET_FAVORITES = gql`
		query GetFavorites {
			favorites @client {
				_id
				title
				overview
				poster_path
				popularity
        tags
        favorite
			}
    }
  `