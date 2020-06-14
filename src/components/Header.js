import React from 'react';
import {Link} from 'react-router-dom';
import "firebase/auth";
import "firebase/database";
import { useFirebaseApp, useUser } from 'reactfire';

const Header = (props) => {

    
        const login = props.login;
        const firebase=useFirebaseApp();        

        // Cierra sesion en firebase
        const logout = async(e) => {
            e.preventDefault();

            await firebase.auth().signOut();
            localStorage.removeItem('usuario');
            // Envia false al state.login de Router para mostrar botones
            window.location.href = "/login";
            props.userLogin(false);
        }
        
        const dataUser = props.user;
        
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
                        { !(localStorage.getItem('usuario')) &&
                        <form className="form-inline my-2 my-lg-0">
                            <Link to="/login"><button to="/login" className="btn btn-outline-info my-2 my-sm-0 menu" type="submit">Iniciar Sesión</button></Link>
                            <Link to="/signup"><button className="btn btn-info my-2 my-sm-0 menu" type="submit">Registrarse</button></Link>
                        </form>
                        }
                        { localStorage.getItem('usuario') &&
                            <div className="row">
                                <h5 className="text-white my-2 mx-2">Bienvenido {JSON.parse(localStorage.getItem('usuario')).nombre}</h5>
                                <Link to="/usuario">
                                    <svg className="bi bi-person-square" width="2.5em" height="2.5em" viewBox="0 0 16 16" fill="blue"  xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                        <path fill-rule="evenodd" d="M2 15v-1c0-1 1-4 6-4s6 3 6 4v1H2zm6-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                    </svg>
                                </Link>
                                <button className="btn btn-danger my-2 my-sm-0 menu" type="submit" onClick={logout}>Cerrar Sesión</button>
                            </div>    
                        } 
                    </div>
                    </nav>
            </header>
            
        );
    
}
export default Header;