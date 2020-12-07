import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { GET_MOVIE, REMOVE_MOVIE, GET_ALL} from '../config/queries'

import { useQuery, gql , useMutation } from '@apollo/client'

function MovieDetail (props) {
    const {id} = useParams()
    const history = useHistory()

    const [removeMovie] = useMutation(REMOVE_MOVIE, {
        refetchQueries: [
          { query: GET_ALL }
        ]
      })

    const {loading, error, data} = useQuery(GET_MOVIE, {
        variables: {
            _id: id
        }
     })


    function Edit (e, id) {
        e.preventDefault()
        // console.log(id)
        history.push(`/editMovie/${id}`)
    }

    function Remove (e, id) {
        e.preventDefault()
        // console.log(id)
        removeMovie({
            variables : {
                _id: id
            }
          })
          .then(() => {
            history.push(`/movies`)
          })
          .catch(error => {
              console.log(error)
          })
          .finally(() => console.log('movie deleted'))
    }

    //  console.log(data)
    if(loading) {
        return <div>Loading .....</div>
    }
    return (

        <div className='d-flex justify-content-center align-items-center ' style={{marginTop: '100px'}}>
            <div className='card shadow' style={{height: '500px', width: '400px', borderRadius: '30px 0px 0px 30px'}}>
                <img src={data.movie.poster_path} style={{height: '100%', width: '100%', objectFit: 'cover', borderRadius: '30px 0px 0px 30px'}} alt=""/>
                <div style={{backdgroundColor: '#000'}} ></div>
            </div>
            <div className='card shadow' style={{height: '500px', width: '500px', borderRadius: '0px 30px 30px 0px'}}>
                <div className='card-body ' style={{padding: '2.5rem'}}>
                <h1 className='card-title text-uppercase' style={{marginBottom: '.2rem'}}>{data.movie.title}</h1>
                    <div className="mb-5">
                        <span className='mr-3 badge badge-warning'style={{fontSize: '12px'}}><i class="fas fa-star" ></i>{data.movie.popularity}</span>
                        <span className="card-text text-uppercase" style={{fontSize: '11px'}}>
                            {data.movie.tags.join('  |  ')}
                        </span>

                    </div>

                    <p className="card-text text-justify" style={{fontSize: '14px'}}>
                        <span className='font-weight-bold'>About: </span>
                        {data.movie.overview}
                    </p>

                </div>
                <div className='card-footer'style={{ padding: '.75rem 2.5rem'}}>
                    <div className='btn-group float-right'>
                        <a type='button' onClick={(e) => Remove(e, data.movie._id)} href="#!" class="btn btn-outline-primary">
                            Delete
                        </a>
                        <a type='button' onClick={(e) => Edit(e, data.movie._id)} href="#!" class="btn btn-outline-primary">
                            Edit
                        </a>
                        <a href="#!" className="btn btn-primary">
                            <i className="far fa-bookmark mr-2"></i>
                            {/* <i className="fas fa-bookmark mr-2"></i> */}
                            Favorite
                        </a>

                    </div>

                </div>
            </div>
        </div>
    )

}


export default MovieDetail