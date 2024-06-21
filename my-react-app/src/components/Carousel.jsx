import React from 'react'
import bookI from '../images/bookI.jpeg';
import bookII from '../images/bookII.jpeg';
import bookIII from '../images/bookIII.jpeg';
function Carousel() {
  return (
    <div id="carouselExampleFade"  className="carousel slide carousel-fade">
        <div className="carousel-inner">
            <div className="carousel-item active">
                <img src={bookI} className="d-block w-100" alt="..."style={{height:600}}/>
            </div>
            <div className="carousel-item">
                <img src={bookII} className="d-block w-100" alt="..."style={{height:600}}/>
            </div>
            <div className="carousel-item">
                <img src={bookIII} className="d-block w-100" alt="..."style={{height:600}}/>
            </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
        </button>
    </div>

  )
}

export default Carousel