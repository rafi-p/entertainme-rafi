import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { GET_MOVIE, UPDATE_MOVIE, GET_MOVIES } from '../config/queries'
import Swal from 'sweetalert2'
import { useQuery, useMutation } from '@apollo/client'

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

function EditMovie (props) {
    const [title, setTitle] = useState('')
    const [overview, setOverview] = useState('')
    const [poster_path, setPoster_path] = useState('')
    const [popularity, setPopularity] = useState(0)
    const [tags, setTags] = useState([])
    const history = useHistory()
    const {id} = useParams()
    // console.log(id)

    const [updateMovie, {loading: loadingMutation}] = useMutation(UPDATE_MOVIE, {
        refetchQueries: [
          { query: GET_MOVIES }
        ]
      })



    const {loading, error, data} = useQuery(GET_MOVIE, {
        variables: {
            _id: id
        }
     })

    console.log(data)

    useEffect(() => {
		if (data) {
			setTitle(data.movie.title)
			setOverview(data.movie.overview)
			setPoster_path(data.movie.poster_path)
			setPopularity(data.movie.popularity)
			setTags(data.movie.tags)
		}
	}, [data])

    function submitMovie (e) {
        e.preventDefault()
        const payload = {
            title,
            overview,
            poster_path,
            popularity: +popularity,
            tags
        }

        if(!title || !overview || !poster_path || !popularity || !tags || tags[0] === '') {
            Toast.fire({
                icon: 'error',
                title: 'Please fill all the required field'
              })
        } else {
            updateMovie({
                variables : {
                    _id: id,
                    data: payload
                }
              })
              .then(() => {
                history.push(`/movies`)

              })
              .catch(error => {
                  console.log(error)
              })
              .finally(() => {
                  console.log('movie updated')
                  Toast.fire({
                    icon: 'success',
                    title: `${title} movie has been edited`
                  })
                })
        }

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

    if(loading) {
        return <div>Loading .....</div>
    }

    return (
        <div className='d-flex justify-content-center align-items-center animate__animated animate__fadeIn' style={{marginTop: '100px'}}>
            <form onSubmit={(e) => submitMovie(e)} className='card shadow' style={{height: '500px', width: '500px', borderRadius: '30px 30px 30px 30px'}}>
                <div className='card-body ' style={{padding: '2.5rem'}}>
                    <h3 className='card-title text-uppercase mb-2' style={{marginBottom: '.2rem', borderBottom: '1px solid #DCDCDC'}}>Edit Movie</h3>

                    <div className="card-text text-justify" style={{fontSize: '14px'}}>

                        <div className="form-group">
                            <label htmlFor="titleInput">Title</label>
                            <input value={title} onChange={(e) => onChangeTitle(e)} type="text" className="form-control" id="titleInput" placeholder="Harry Potter"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="overviewInput">Overview</label>
                            <textarea value={overview} onChange={(e) => onChangeOverview(e)} type="text" className="form-control" id="overviewInput" placeholder="Magic boy with thunder in his forehead"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="posterInput">Poster Image</label>
                            <input value={poster_path} onChange={(e) => onChangePoster_path(e)} type="url" className="form-control" id="posterInput" placeholder="www.google.com/image.png"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="popularityInput">Popularity</label>
                            <input value={popularity} onChange={(e) => onChangePopularity(e)} type="number" className="form-control" id="popularityInput" min="0" max='10' step='0.1' placeholder="8.5"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="tagInput">Tags</label>
                            <input value={tags} onChange={(e) => onChangeTags(e)} type="text" className="form-control" id="tagInput" min="0" placeholder="action, drama"/>
                        </div>
                    </div>

                </div>
                <button className='btn btn-primary' style={{ padding: '.75rem 2.5rem'}}>
                     { loadingMutation
                        ?<div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        : <span><i className="fas fa-plus mr-2"></i>
                        <span>Edit</span></span>
                    }
                </button>
            </form>
        </div>

    )
}

export default EditMovie