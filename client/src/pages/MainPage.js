import React, { useEffect, useState } from 'react'
import ShowcaseCard from '../components/showcaseCard'
import SlideCard from '../components/slideCard'
import { GET_MOVIES, GET_SERIES, GET_ALL } from '../config/queries'

import { useQuery, gql } from '@apollo/client'


function Home () {
    const [reversedMovie, setReversedMovie] = useState([])
    const [reversedSeries, setReversedSeries] = useState([])
    const [newArrMovie, setNewArrMovie] = useState([])

    const {loading, error, data} = useQuery(GET_ALL)

    const sliceMovie = reversedMovie.reverse().slice(0,10)
    console.log(sliceMovie)

    const sliceSeries = reversedSeries.reverse().slice(0,10)
    console.log(sliceSeries)

    useEffect(() => {
      if(data) {
        setReversedMovie([...data.movies])
        setReversedSeries([...data.series])
        setNewArrMovie([...data.movies])
      }
    },[data])

    function selectionSort(arr) {
      for (let i = 0; i < arr.length; i++) {
          let smol = arr[i].popularity
          let minimIndex = i
          for (let j = i; j < arr.length; j++) {
              if(arr[j].popularity < smol) {
                  smol = arr[j].popularity
                  minimIndex = j
              }
          }
          let tuker = arr[i]
          arr[i] = arr[minimIndex]
          arr[minimIndex] = tuker
      }
      return arr
  }


  const sortingByPopularity = selectionSort(newArrMovie).reverse()
  const filterMoviePopular = sortingByPopularity.filter((el, index) => index < 5)
  console.log(filterMoviePopular)

    if(loading) {
        return <div>Loading .....</div>
    }

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
            {/* {JSON.stringify(filterMoviePopular)} */}
            {

              filterMoviePopular.map(el => {
                return (
                  <ShowcaseCard key={el._id} movie={el}/>
                )

              })
            }
            </ul>

          </section>

          {/* <!--latest-movies----------------------> */}
          <section id="latest">
            <h2 className="latest-heading">Latest Movies</h2>
            {/* <!--slider-------------------> */}
            <ul id="autoWidth2" className="cs-hidden d-flex scrollbar scrollbar-black bordered-black square thin">
            {
              sliceMovie.map(movie => {
                return (
                  <SlideCard key={movie._id} movie={movie}/>
                )
              })
            }
            </ul>
          </section>

          {/* <!--latest-series----------------------> */}
          <section id="latest">
            <h2 className="latest-heading">Latest Series</h2>
            {/* <!--slider-------------------> */}
            <ul id="autoWidth2" className="cs-hidden d-flex scrollbar scrollbar-black bordered-black square thin">
            { data.series !== undefined &&
              sliceSeries.map(serie => {
                return (
                  <SlideCard key={serie._id} movie={serie}/>
                )
              })
            }
            </ul>
          </section>

        </>
    )
}

export default Home