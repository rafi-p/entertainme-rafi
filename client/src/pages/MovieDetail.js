import React from 'react'
import imageM1 from '../assets/m-1.jpg'

function MovieDetail (props) {

    return (

        <div className='d-flex justify-content-center align-items-center ' style={{marginTop: '100px'}}>
            <div className='card shadow' style={{height: '500px', width: '400px', borderRadius: '30px 0px 0px 30px'}}>
                <img src={imageM1} style={{height: '100%', width: '100%', objectFit: 'cover', borderRadius: '30px 0px 0px 30px'}}/>
                <div style={{backdgroundColor: '#000'}}></div>
            </div>
            <div className='card shadow' style={{height: '500px', width: '500px', borderRadius: '0px 30px 30px 0px'}}>
                <div className='card-body ' style={{padding: '2.5rem'}}>
                    <h1 className='card-title text-uppercase' style={{marginBottom: '.2rem'}}>Green Book</h1>
                    <div className="mb-5">
                        <span className='mr-3 badge badge-warning'style={{fontSize: '12px'}}><i class="fas fa-star" ></i>3.5</span>
                        <span className="card-text text-uppercase" style={{fontSize: '11px'}}>
                            action  |  drama  |  comedy
                        </span>

                    </div>

                    <p className="card-text text-justify" style={{fontSize: '14px'}}>
                        <span className='font-weight-bold'>About: </span>
                        Dr Don Shirley is a world-class African-American pianist, who is about to embark on a concert tour in the Deep South in 1962. In need of a driver and protection, Shirley recruits Tony Lip, a tough-talking bouncer from an Italian-American neighbourhood in the Bronx. Despite their differences, the two men soon develop an unexpected bond while confronting racism and danger in an era of segregation.
                    </p>

                </div>
                <div className='card-footer'style={{ padding: '.75rem 2.5rem'}}>
                    <div className='btn-group float-right'>
                        <a href="#!" class="btn btn-outline-primary">
                            Edit
                        </a>
                        <a href="#!" class="btn btn-primary">
                            <i className="far fa-bookmark mr-2"></i>
                            {/* <i class="fas fa-bookmark mr-2"></i> */}
                            Favorite
                        </a>

                    </div>

                </div>
            </div>
        </div>
    )

}


export default MovieDetail