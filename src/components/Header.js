import React from 'react';
import {Link} from 'react-router-dom';

class Header extends React.Component{
    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="#">Don Clima</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/#clima">Pronostico</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/#impactos">Impactos</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/#consejos">Consejos</a>
                        </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                        <Link to="/login"><button to="/login" className="btn btn-outline-info my-2 my-sm-0 menu" type="submit">Iniciar Sesión</button></Link>
                        <Link to="/signup"><button className="btn btn-info my-2 my-sm-0 menu" type="submit">Registrarse</button></Link>
                        </form>
                    </div>
                    </nav>
            </header>
            
        );
    }
}
export default Header;