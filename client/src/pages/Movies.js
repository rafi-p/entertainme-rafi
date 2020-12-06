import React from 'react'
import Card from '../components/card'
import SlideCard from '../components/slideCard'

function Movies (props) {


    return (
        <>
            <div className="movies-heading">
                <h2>Movies</h2>
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

export default Movies