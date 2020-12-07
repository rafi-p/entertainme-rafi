import React from 'react'
import image1 from '../assets/s-1.jpg'

function ShowcaseCard (props) {

    return (
        <li className="item-a">
            <div className="showcase-box">
                <img src={image1} alt=""/>
            </div>
        </li>
    )
}

export default ShowcaseCard