import React, { useState } from 'react'
import imageM1 from '../assets/m-1.jpg'

function SlideCard (props) {

    return (
        <li className="item-a">
        <div class="card d-flex" style={{width:'200px', border: 0, margin: '20px 10px', flexDirection: 'column', overflow:'hidden', backgroundColor: 'transparent'}}>
            <div className="latest-b-img shadow"  style={{borderRadius: '15px'}}>
                <i className="far fa-bookmark text-white" style={{position: 'absolute', right: '15px', top: '15px', fontSize: '25px'}}></i>
                {/* <i class="fas fa-bookmark text-white" style={{position: 'absolute', right: '15px', top: '15px', fontSize: '25px'}}></i> */}
                <img class="card-img-top"  style={{borderRadius: '15px'}} src={imageM1} alt="Card image cap"/>
            </div>

            <div class="card-body">
                <h6 class="card-title">
                    Kin 2018
                    <span className='float-right badge badge-warning'><i class="fas fa-star"></i>3.5</span>
                </h6>

                <p class="card-text" style={{fontSize: '12px'}}>
                    <span>Action</span>
                    <i class="fas fa-pen float-right"></i>
                </p>

            </div>
        </div>
        </li>
    )
}

export default SlideCard