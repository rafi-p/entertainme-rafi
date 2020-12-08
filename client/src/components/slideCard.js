import React from 'react'
import { useHistory } from 'react-router-dom'
import { favoriteVars } from '../config/graphql'
import { PATCH_MOVIE, GET_MOVIES } from '../config/queries'
import Swal from 'sweetalert2'
import { useMutation } from '@apollo/client'

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

function SlideCard (props) {
    const history = useHistory()
    const {movie, serie} = props

    const [patchMovie] = useMutation(PATCH_MOVIE, {
        refetchQueries: [
          { query: GET_MOVIES }
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

    function toDetail (e, id) {
        e.preventDefault()
        history.push(`/detailMovie/${id}`)
    }
    return (
        <li className="item-a">
        <div className="card d-flex" style={{width:'200px', border: 0, margin: '20px 10px', flexDirection: 'column', overflow:'hidden', backgroundColor: 'transparent'}}>
            <div className="latest-b-img shadow"  style={{borderRadius: '15px'}}>

                {movie.favorite === false &&
                    <i onClick={(e) => addFavorite(e, movie)} type='button' className="far fa-bookmark text-white" style={{position: 'absolute', right: '15px', top: '15px', fontSize: '25px'}}></i>
                }

                {movie.favorite === true &&
                    <i
                        onClick={(e) => removeFavorite(e, movie)}
                        type='button' className="fas fa-bookmark text-white"
                        style={{position: 'absolute', right: '15px', top: '15px', fontSize: '25px'}
                    }></i>
                }
                <img
                    onClick={serie ? () => console.log('nothing happen cause serie') : (e) => toDetail(e, movie._id)}
                    type={ serie ? '' : 'button' }
                    className="card-img-top"  style={{borderRadius: '15px'}} src={movie.poster_path} alt=""
                />
            </div>

            <div className="card-body">
                <h6 className="card-title d-flex">
                    <div className='mr-2' style={{whiteSpace:'nowrap', width: '120px', overflow:'hidden', textOverflow: 'ellipsis'}}>{movie.title}</div>
                    <span className='float-right badge badge-warning'><i className="fas fa-star"></i>{movie.popularity}</span>
                </h6>

                <p className="card-text" style={{fontSize: '12px'}}>
                    <span>{movie.tags.join('  |  ')}</span>
                    {/* <i className="fas fa-pen float-right"></i> */}
                </p>

            </div>
        </div>
        </li>
    )
}

export default SlideCard