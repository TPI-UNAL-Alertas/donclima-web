import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFacebookSquare, faTwitterSquare, faGooglePlusSquare, faYoutubeSquare, faInstagramSquare} from '@fortawesome/free-brands-svg-icons';

class Footer extends React.Component{
    render() {
        return (
            <footer className="p-3 mb-2 bg-dark text-white">

                <div className="row">
                    <div className="col-md footer-text">
                        <a className="footer-icon" href="#"><small className="h4"><FontAwesomeIcon icon={faFacebookSquare} /></small></a>
                        <a className="footer-icon" href="#"><small className="h4"><FontAwesomeIcon icon={faTwitterSquare} /></small></a>
                        <a className="footer-icon" href="#"><small className="h4"><FontAwesomeIcon icon={faGooglePlusSquare} /></small></a>
                        <a className="footer-icon" href="#"><small className="h4"><FontAwesomeIcon icon={faYoutubeSquare} /></small></a>
                        <a className="footer-icon" href="#"><small className="h4"><FontAwesomeIcon icon={faInstagramSquare} /></small></a>
                    </div>
                </div>

                <div className="footer-text"> 
                    <small><p className="footer-text"><strong>&copy; 2020 Don Clima</strong> <em>Todos los derechos reservados.</em></p></small>
                    <small><p className="footer-text">Universidad Nacional de Colombia</p></small>
                    <small><p className="footer-text">TPi - Taller de Proyectos interdisciplinarios</p></small>                    
                </div>
            </footer>
        );
    }
}
export default Footer;