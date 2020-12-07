import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { GET_MOVIE, UPDATE_MOVIE } from '../config/queries'

import { useQuery, gql , useMutation } from '@apollo/client'

function EditMovie (props) {
    const [title, setTitle] = useState('')
    const [overview, setOverview] = useState('')
    const [poster_path, setPoster_path] = useState('')
    const [popularity, setPopularity] = useState(0)
    const [tags, setTags] = useState([])

    const [updateMovie] = useMutation(UPDATE_MOVIE)

    const history = useHistory()
    const {id} = useParams()

    const {loading, error, data} = useQuery(GET_MOVIE, {
        variables: {
            _id: id
        }
     })
    console.log(data)

    function submitMovie (e) {
        e.preventDefault()
        const payload = {
            title,
            overview,
            poster_path,
            popularity: +popularity,
            tags
        }

        updateMovie({
            variables : {
                _id: id,
                data: payload
            }
          })
        console.log(payload)
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
                    <h3 className='card-title text-uppercase mb-2' style={{marginBottom: '.2rem', borderBottom: '1px solid #DCDCDC'}}>Edit Movie</h3>

                    <div className="card-text text-justify" style={{fontSize: '14px'}}>

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
                    {/* <div className='btn-group float-right'> */}
                        {/* <a href="#!" className="btn btn-primary"> */}
                            <i className="fas fa-plus mr-2"></i>
                            {/* <i className="fas fa-bookmark mr-2"></i> */}
                            <span>Edit</span>
                        {/* </a> */}

                    {/* </div> */}

                </button>
            </form>
        </div>

    )
}

export default EditMovie