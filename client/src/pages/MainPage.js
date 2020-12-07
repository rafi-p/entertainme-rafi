import React, { useState } from 'react'
import ShowcaseCard from '../components/showcaseCard'
import SlideCard from '../components/slideCard'
import { GET_MOVIES } from '../config/queries'

import { useQuery, gql } from '@apollo/client'


// const GET_MOVIES = gql`
//   query getMovies {
//     movies {
//         _id
//         title
//         overview
//         poster_path
//         popularity
//         tags
//     }
//   }
// `
// const GET_MOVIE=gql`

//   query getMovie($id : ID) {
//     movie (_id: $id) {
//       id
//       name
//       age
//       country
//     }
//   }
// `


function Home () {

    const {loading, error, data} = useQuery(GET_MOVIES)
    console.log(data)

    // if(loading) {
    //     return <div>Loading .....</div>
    // }

    // if(error) {
    //     return <div>{error.message}</div>
    // }

    return (
        <>
          {/* <div>{JSON.stringify(data)}</div> */}

          <section id="main">
            {/* <!--showcase----------------------->
            <!--heading-------------> */}
            <h1 className="showcase-heading">Showcase</h1>

            <ul id="autoWidth" className="cs-hidden d-flex scrollbar scrollbar-black bordered-black square thin">
              <ShowcaseCard />
              <ShowcaseCard />
              <ShowcaseCard />
              <ShowcaseCard />
            </ul>

          </section>

          {/* <!--latest-movies----------------------> */}
          <section id="latest">
            <h2 className="latest-heading">Latest Movies</h2>
            {/* <!--slider-------------------> */}
            <ul id="autoWidth2" className="cs-hidden d-flex scrollbar scrollbar-black bordered-black square thin">
              <SlideCard />
              <SlideCard />
              <SlideCard />
              <SlideCard />
              <SlideCard />
              <SlideCard />
              <SlideCard />
              <SlideCard />
            </ul>
          </section>

          {/* <!--latest-series----------------------> */}
          <section id="latest">
            <h2 className="latest-heading">Latest Series</h2>
            {/* <!--slider-------------------> */}
            <ul id="autoWidth2" className="cs-hidden d-flex scrollbar scrollbar-black bordered-black square thin">
              <SlideCard />
              <SlideCard />
              <SlideCard />
              <SlideCard />
              <SlideCard />
              <SlideCard />
              <SlideCard />
              <SlideCard />
            </ul>
          </section>

        </>
    )
}

export default Home