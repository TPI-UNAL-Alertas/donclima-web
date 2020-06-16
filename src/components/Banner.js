import React from 'react';
import img1 from '../img/banner1.png';
import img2 from '../img/banner2.png';
import img3 from '../img/banner3.png';
import title from '../img/logo/logo1.png';

class Banner extends React.Component{
    render() {
        return (
            <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
                <div>
                    <img className="logo-title" src={title}/>
                </div>
                
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                    <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                    <img src={img1} className="d-block w-100" alt="..."/>
                    <div className="carousel-caption d-none d-md-block">
                        <h5></h5>
                        <p></p>
                    </div>
                    </div>
                    <div className="carousel-item">
                    <img src={img2} className="d-block w-100" alt="..."/>
                    <div className="carousel-caption d-none d-md-block">
                        <h5></h5>
                        <p></p>
                    </div>
                    </div>
                    <div className="carousel-item">
                    <img src={img3} className="d-block w-100" alt="..."/>
                    <div className="carousel-caption d-none d-md-block">
                        <h5></h5>
                        <p></p>
                    </div>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        );
    }
}
export default Banner;