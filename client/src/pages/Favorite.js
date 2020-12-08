import React from 'react'
import Card from '../components/card'
import { GET_FAVORITES } from '../config/queries'
import loading_animated from '../assets/loading_scr.gif'
import empty from '../assets/resting_.svg'

import { useQuery} from '@apollo/client'

function Favorite (props) {

    const {loading, error, data: dataFavorites} = useQuery(GET_FAVORITES)
    // console.log(dataFavorites)
    if(loading) {
        return (
            <div>
                <img src={loading_animated} style={{position: 'fixed', zIndex: 999, top:0, left:0, right:0, bottom:0, margin:'auto'}} height="200"></img>
            </div>
          )
        }

    if(dataFavorites.favorites.length === 0) {
        return (
            <div className='animate__animated animate__fadeIn'>
                <div className="movies-heading">
                    <h2>Favorite</h2>
                </div>
                <div>
                    <img src={empty} style={{position: 'fixed', zIndex: 999, top:0, left:0, right:0, bottom:0, margin:'auto'}} height="350"></img>
                </div>

            </div>
          )
    }
    return (
        <div className='animate__animated animate__fadeIn'>
            <div className="movies-heading">
                <h2>Favorite</h2>
            </div>
            <section id="movies-list" className='container'>
                {
                    dataFavorites.favorites.map(movie => {
                        return (
                            <Card key={movie._id} movie={movie}/>
                        )
                    })
                }

            </section>
        </div>
    )
}

export default Favorite