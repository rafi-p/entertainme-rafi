import React, {useEffect, useState} from 'react'
import Card from '../components/card'
import { GET_MOVIES } from '../config/queries'
import loading_animated from '../assets/loading_scr.gif'


import { useQuery} from '@apollo/client'

function Movies (props) {
    const [dataMovies, setDataMovies] = useState([])

    const {loading, error, data} = useQuery(GET_MOVIES)
    // console.log(data)

    useEffect(() => {
        if(data) {

            setDataMovies([...data.movies])
        }
      },[data])

    if(loading) {
        return (
            <div className='animate__animated animate__fadeIn'>
                <img src={loading_animated} style={{position: 'fixed', zIndex: 999, top:0, left:0, right:0, bottom:0, margin:'auto'}} height="200"></img>
            </div>
        )
    }

    return (
        <div className='animate__animated animate__fadeIn'>
            <div className="movies-heading">
                <h2>Movies</h2>
            </div>
            <section id="movies-list" className='container'>
                {data !== undefined &&
                    dataMovies.map(movie => {
                        return (
                            <Card key={movie._id} movie={movie}/>
                        )
                    })
                }

            </section>
        </div>
    )
}

export default Movies