import React, { useState} from 'react'
import { useHistory } from 'react-router-dom'


function Card (props) {
    const history = useHistory()
    const {movie} = props

    // function Edit (id) {
    //     // console.log(id)
    //     history.push(`/editMovie/${id}`)
    // }

    function toDetail (e, id) {
        e.preventDefault()
        history.push(`/detailMovie/${id}`)
    }

    return (
        <div className="card d-flex" style={{width:'300px', border: 0, margin: '20px 10px', flexDirection: 'column', overflow:'hidden', backgroundColor: 'transparent'}}>
            <div className="latest-b-img shadow"  style={{borderRadius: '15px', width: '100%', height: '400px'}}>
                <i className="far fa-bookmark text-white" style={{position: 'absolute', right: '15px', top: '15px', fontSize: '25px'}}></i>
                {/* <i className="fas fa-bookmark text-white" style={{position: 'absolute', right: '15px', top: '15px', fontSize: '25px'}}></i> */}
                <img onClick={(e) => toDetail(e, movie._id)} type='button' className="card-img-top"  style={{borderRadius: '15px'}} src={movie.poster_path} alt=""/>
            </div>

            <div className="card-body">
                <h6 className="card-title">
                    {movie.title}
                    <span className='float-right badge badge-warning'><i className="fas fa-star"></i>{movie.popularity}</span>
                </h6>

                <p className="card-text" style={{fontSize: '12px'}}>
                    <span>{movie.tags}</span>
                    {/* <i type='button' onClick={() => Edit(movie._id)} className="fas fa-pen float-right"></i> */}
                </p>

            </div>
        </div>
    )
}


export default Card