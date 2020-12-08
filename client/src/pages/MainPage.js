import React, { useEffect, useState } from 'react'
import ShowcaseCard from '../components/showcaseCard'
import SlideCard from '../components/slideCard'
import { GET_MOVIES, GET_SERIES } from '../config/queries'
import loading_animated from '../assets/loading_scr.gif'

import { useQuery } from '@apollo/client'


function Home () {
    const [reversedMovie, setReversedMovie] = useState([])
    const [reversedSeries, setReversedSeries] = useState([])
    const [newArrMovie, setNewArrMovie] = useState([])

    const {loading: loadingMovies, error: errorMovies, data: dataMovies} = useQuery(GET_MOVIES)
    const sliceMovie = reversedMovie.reverse().slice(0,10)
    // console.log(sliceMovie)

    const {loading: loadingSeries, error: errorSeries, data: dataSeries} = useQuery(GET_SERIES)
    const sliceSeries = reversedSeries.reverse().slice(0,10)
    // console.log(sliceSeries)

    useEffect(() => {
      if(dataMovies && dataSeries) {
        setReversedMovie([...dataMovies.movies])
        setReversedSeries([...dataSeries.series])
        setNewArrMovie([...dataMovies.movies])
      }
    },[dataMovies, dataSeries])

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
  // console.log(filterMoviePopular)


  if(loadingMovies || loadingSeries) {
    return (
        <div className='animate__animated animate__fadeIn'>
            <img src={loading_animated} style={{position: 'fixed', zIndex: 999, top:0, left:0, right:0, bottom:0, margin:'auto'}} height="200"></img>
        </div>
      )
    }

    return (
        <div className='animate__animated animate__fadeIn'>

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
            {
              sliceSeries.map(serie => {
                return (
                  <SlideCard key={serie._id} movie={serie} serie={true}/>
                )
              })
            }
            </ul>
          </section>

        </div>
    )
}

export default Home