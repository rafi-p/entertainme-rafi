import React from 'react'
import image1 from '../assets/s-1.jpg'

function ShowcaseCard (props) {
    const {movie} = props
    console.log(movie)
    return (
        <li className="item-a">
            <div className="showcase-box">
                <img src={movie.poster_path} alt=""/>
            </div>
        </li>
    )
}

export default ShowcaseCard