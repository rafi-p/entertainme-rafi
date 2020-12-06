import React, { useState } from 'react'

function AddMovie (props) {

    return (
        <div className='d-flex justify-content-center align-items-center ' style={{marginTop: '100px'}}>
            <form className='card shadow' style={{height: '500px', width: '500px', borderRadius: '30px 30px 30px 30px'}}>
                <div className='card-body ' style={{padding: '2.5rem'}}>
                    <h3 className='card-title text-uppercase mb-2' style={{marginBottom: '.2rem', borderBottom: '1px solid #DCDCDC'}}>Add Movie</h3>

                    <div className="card-text text-justify" style={{fontSize: '14px'}}>

                        <div className="form-group">
                            <label for="titleInput">Title</label>
                            <input type="text" className="form-control" id="titleInput" placeholder="Harry Potter"/>
                        </div>

                        <div className="form-group">
                            <label for="overviewInput">Overview</label>
                            <textarea type="text" className="form-control" id="overviewInput" placeholder="Magic boy with thunder in his forehead"/>
                        </div>

                        <div className="form-group">
                            <label for="posterInput">Poster Image</label>
                            <input type="url" className="form-control" id="posterInput" placeholder="www.google.com/image.png"/>
                        </div>

                        <div className="form-group">
                            <label for="popularityInput">Popularity</label>
                            <input type="number" className="form-control" id="popularityInput" min="0" max='10' step='0.1' placeholder="8.5"/>
                        </div>

                        <div className="form-group">
                            <label for="tagInput">Tags</label>
                            <input type="text" className="form-control" id="tagInput" min="0" placeholder="action, drama"/>
                        </div>
                    </div>

                </div>
                <div className='card-footer'style={{ padding: '.75rem 2.5rem'}}>
                    <div className='btn-group float-right'>
                        <a href="#!" class="btn btn-primary">
                            <i class="fas fa-plus mr-2"></i>
                            {/* <i class="fas fa-bookmark mr-2"></i> */}
                            <span>Add</span>
                        </a>

                    </div>

                </div>
            </form>
        </div>
    )
}

export default AddMovie