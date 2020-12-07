import React from 'react'
import Card from '../components/card'
import { GET_MOVIES } from '../config/queries'

import { useQuery, gql } from '@apollo/client'

function Movies (props) {

    const {loading, error, data, refetch} = useQuery(GET_MOVIES)
    console.log(data)


    return (
        <>
            <div className="movies-heading">
                <h2>Movies</h2>
            </div>
            <section id="movies-list" className='container'>
                {data !== undefined &&
                    data.movies.map(movie => {
                        return (
                            <Card key={movie._id} movie={movie}/>
                        )
                    })
                }

            </section>
        </>
    )
}

export default Movies