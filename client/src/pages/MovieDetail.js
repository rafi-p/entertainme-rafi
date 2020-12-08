import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { favoriteVars } from '../config/graphql'
import { GET_MOVIE, REMOVE_MOVIE, GET_MOVIES, PATCH_MOVIE, GET_FAVORITES} from '../config/queries'
import Swal from 'sweetalert2'
import loading_animated from '../assets/loading_scr.gif'
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

function MovieDetail (props) {
    const {id} = useParams()
    const history = useHistory()

    const [removeMovie] = useMutation(REMOVE_MOVIE, {
        refetchQueries: [
          { query: GET_MOVIES }
        ]
      })

    const {loading, error, data} = useQuery(GET_MOVIE, {
        variables: {
            _id: id
        }
     })
    //  console.log(data)


    function Edit (e, id) {
        e.preventDefault()
        // console.log(id)
        history.push(`/editMovie/${id}`)
    }

    function Remove (e, id) {
        e.preventDefault()
        // console.log(id)

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Deleted!',
                'Movie has been deleted.',
                'success'
              )

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
              .finally(() => {
                  console.log('movie deleted')
                })

            }
          })

    }

    const [patchMovie] = useMutation(PATCH_MOVIE, {
        refetchQueries: [
          { query: GET_MOVIES },
          { query: GET_FAVORITES }
        ]
      })

    function addFavorite (e, movie) {
        e.preventDefault()

        const currentFavorites = favoriteVars()
        patchMovie({
            variables : {
                _id: movie._id,
                data: {favorite: true}
            }
          })
          .then(({data}) => {
            favoriteVars([ ...currentFavorites, data.patchMovie])
          })
          .catch(error => {
              console.log(error)
          })
          .finally(() => {
              console.log('movie updated')
              Toast.fire({
                icon: 'success',
                title: `${movie.title} is your favorite now!`
              })
          })
    }

    function removeFavorite (e, movie) {
        e.preventDefault()
        const currentFavorites = favoriteVars()
        const filterFavorites = currentFavorites.filter(el => el._id !== movie._id)
        // console.log(filterFavorites)

        patchMovie({
            variables : {
                _id: movie._id,
                data: {favorite: false}
            }
          })
          .then(() => {
            favoriteVars(filterFavorites)
          })
          .catch(error => {
              console.log(error)
          })
          .finally(() => {
              console.log('movie unfavorited')
              Toast.fire({
                icon: 'success',
                title: `${movie.title} has been removed`
              })
          })
    }

    //  console.log(data)
    if(loading) {
        return (
            <div className='animate__animated animate__fadeIn'>
                <img src={loading_animated} style={{position: 'fixed', zIndex: 999, top:0, left:0, right:0, bottom:0, margin:'auto'}} height="200"></img>
            </div>
          )
        }
    return (

        <div className='d-flex justify-content-center align-items-center animate__animated animate__fadeIn' style={{marginTop: '100px'}}>
            <div className='card shadow' style={{height: '500px', width: '400px', borderRadius: '30px 0px 0px 30px'}}>
                <img src={data.movie.poster_path} style={{height: '100%', width: '100%', objectFit: 'cover', borderRadius: '30px 0px 0px 30px'}} alt=""/>
                <div style={{backdgroundColor: '#000'}} ></div>
            </div>
            <div className='card shadow' style={{height: '500px', width: '500px', borderRadius: '0px 30px 30px 0px'}}>
                <div className='card-body ' style={{padding: '2.5rem'}}>
                <h1 className='card-title text-uppercase' style={{marginBottom: '.2rem'}}>{data.movie.title}</h1>
                    <div className="mb-5">
                        <span className='mr-3 badge badge-warning'style={{fontSize: '12px'}}><i className="fas fa-star" ></i>{data.movie.popularity}</span>
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
                        <a type='button' onClick={(e) => Remove(e, data.movie._id)} href="#!" className="btn btn-outline-primary">
                            Delete
                        </a>
                        <a type='button' onClick={(e) => Edit(e, data.movie._id)} href="#!" className="btn btn-outline-primary">
                            Edit
                        </a>


                        {data.movie.favorite === false &&
                            <a onClick={(e) => addFavorite(e, data.movie)} href="#!" className="btn btn-primary">
                                <i  type='button' className="far fa-bookmark mr-2"></i>
                                Favorite
                            </a>
                        }

                        {data.movie.favorite === true &&
                            <a onClick={(e) => removeFavorite(e, data.movie)} href="#!" className="btn btn-primary">
                                <i  type='button' className="fas fa-bookmark mr-2"></i>
                                Unfavorite
                            </a>
                        }
                    </div>

                </div>
            </div>
        </div>
    )

}


export default MovieDetail