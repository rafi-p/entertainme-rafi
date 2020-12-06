import React from 'react'
import Card from '../components/card'

function Series (props) {


    return (
        <>
            <div className="movies-heading">
                <h2>TV Shows</h2>
            </div>
            <section id="movies-list" className='container'>
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </section>
        </>
    )
}

export default Series