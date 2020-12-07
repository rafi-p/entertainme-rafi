import React from 'react'
import Card from '../components/card'
import { GET_SERIES } from '../config/queries'

import { useQuery, gql } from '@apollo/client'

function Series (props) {

    const {loading, error, data} = useQuery(GET_SERIES)
    console.log(data)

    return (
        <>
            <div className="movies-heading">
                <h2>TV Shows</h2>
            </div>
            <section id="movies-list" className='container'>
                {data !== undefined &&
                    data.series.map(serie => {
                        return (
                            <Card key={serie._id} movie={serie}/>
                        )
                    })
                }
            </section>
        </>
    )
}

export default Series