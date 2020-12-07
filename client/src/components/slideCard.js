import React, { useState } from 'react'
import imageM1 from '../assets/m-1.jpg'

function SlideCard (props) {

    return (
        <li className="item-a">
        <div className="card d-flex" style={{width:'200px', border: 0, margin: '20px 10px', flexDirection: 'column', overflow:'hidden', backgroundColor: 'transparent'}}>
            <div className="latest-b-img shadow"  style={{borderRadius: '15px'}}>
                <i className="far fa-bookmark text-white" style={{position: 'absolute', right: '15px', top: '15px', fontSize: '25px'}}></i>
                {/* <i className="fas fa-bookmark text-white" style={{position: 'absolute', right: '15px', top: '15px', fontSize: '25px'}}></i> */}
                <img className="card-img-top"  style={{borderRadius: '15px'}} src={imageM1} alt=""/>
            </div>

            <div className="card-body">
                <h6 className="card-title">
                    Kin 2018
                    <span className='float-right badge badge-warning'><i className="fas fa-star"></i>3.5</span>
                </h6>

                <p className="card-text" style={{fontSize: '12px'}}>
                    <span>Action</span>
                    <i className="fas fa-pen float-right"></i>
                </p>

            </div>
        </div>
        </li>
    )
}

export default SlideCard