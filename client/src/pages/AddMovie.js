import React, { useState } from 'react'
import { ADD_MOVIE, GET_MOVIES, GET_ALL } from '../config/queries'
import { useHistory } from 'react-router-dom'

import { useQuery, gql, useMutation } from '@apollo/client'

function AddMovie (props) {
    const [title, setTitle] = useState('')
    const [overview, setOverview] = useState('')
    const [poster_path, setPoster_path] = useState('')
    const [popularity, setPopularity] = useState(0)
    const [tags, setTags] = useState([])

    const history = useHistory()

    const [addMovie] = useMutation(ADD_MOVIE, {
          refetchQueries: [
            { query: GET_ALL }
          ]
        })

    function submitMovie (e) {
        e.preventDefault()
        const payload = {
            title,
            overview,
            poster_path,
            popularity: +popularity,
            tags
        }

        addMovie({
            variables : {
              data : payload
            }
          })
        console.log(payload)
        history.push(`/`)
    }

    function onChangeTitle (e) {
        e.preventDefault()
        setTitle(e.target.value)
    }

    function onChangeOverview (e) {
        e.preventDefault()
        setOverview(e.target.value)
    }

    function onChangePoster_path (e) {
        e.preventDefault()
        setPoster_path(e.target.value)
    }

    function onChangePopularity (e) {
        e.preventDefault()
        setPopularity(e.target.value)
    }

    function onChangeTags (e) {
        e.preventDefault()
        const splitArr = e.target.value.split(',')
        setTags(splitArr)
    }


    return (
        <div className='d-flex justify-content-center align-items-center ' style={{marginTop: '100px'}}>
            <form onSubmit={(e) => submitMovie(e)} className='card shadow' style={{height: '500px', width: '500px', borderRadius: '30px 30px 30px 30px'}}>
                <div className='card-body ' style={{padding: '2.5rem'}}>
                    <h3 className='card-title text-uppercase mb-2' style={{marginBottom: '.2rem', borderBottom: '1px solid #DCDCDC'}}>Add Movie</h3>

                    <div className="card-text text-justify" style={{fontSize: '14px'}}>
                        {title}
                        <div className="form-group">
                            <label for="titleInput">Title</label>
                            <input onChange={(e) => onChangeTitle(e)} type="text" className="form-control" id="titleInput" placeholder="Harry Potter"/>
                        </div>

                        <div className="form-group">
                            <label for="overviewInput">Overview</label>
                            <textarea onChange={(e) => onChangeOverview(e)} type="text" className="form-control" id="overviewInput" placeholder="Magic boy with thunder in his forehead"/>
                        </div>

                        <div className="form-group">
                            <label for="posterInput">Poster Image</label>
                            <input onChange={(e) => onChangePoster_path(e)} type="text" className="form-control" id="posterInput" placeholder="www.google.com/image.png"/>
                        </div>

                        <div className="form-group">
                            <label for="popularityInput">Popularity</label>
                            <input onChange={(e) => onChangePopularity(e)} type="number" className="form-control" id="popularityInput" min="0" max='10' step='0.1' placeholder="8.5"/>
                        </div>

                        <div className="form-group">
                            <label for="tagInput">Tags</label>
                            <input onChange={(e) => onChangeTags(e)} type="text" className="form-control" id="tagInput" min="0" placeholder="action, drama"/>
                        </div>
                    </div>

                </div>
                <button className='btn btn-primary' style={{ padding: '.75rem 2.5rem'}}>
                    {/* <div className='btn-group float-right'>
                        <button className="btn btn-primary" type='button'> */}
                            <i className="fas fa-plus mr-2"></i>
                            {/* <i className="fas fa-bookmark mr-2"></i> */}
                            <span>Add</span>
                        {/* </button> */}

                    {/* </div> */}

                </button>
            </form>
        </div>
    )
}

export default AddMovie