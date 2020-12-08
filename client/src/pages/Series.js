import React from 'react'
import Card from '../components/card'
import { GET_SERIES } from '../config/queries'
import loading_animated from '../assets/loading_scr.gif'

import { useQuery} from '@apollo/client'

function Series (props) {

    const {loading, error, data} = useQuery(GET_SERIES)
    // console.log(data)

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
                <h2>TV Shows</h2>
            </div>
            <section id="movies-list" className='container'>
                {data !== undefined &&
                    data.series.map(serie => {
                        return (
                            <Card key={serie._id} movie={serie} serie={true}/>
                        )
                    })
                }
            </section>
        </div>
    )
}

export default Series