import React from 'react';
import { Link } from 'react-router-dom';
import "firebase/auth";
import "firebase/database";
import { useFirebaseApp, useUser } from 'reactfire';
import logo from '../img/logo/logo0.png';
import img from '../img/logo/personaje0.png';
import moment from 'moment';

const Header = (props) => {

    const firebase = useFirebaseApp();
    const dataUserRoot = { email: 'donclima@donclima.com', password: '12345678' };

    // Cierra sesion en firebase
    const logout = async (e) => {
        e.preventDefault();

        await firebase.auth().signOut();
        localStorage.removeItem('usuario');
        localStorage.removeItem('markersForecastReal');
        localStorage.removeItem('pronosticoUser');
        localStorage.removeItem('alertaUser');
        // Envia false al state.login de Router para mostrar botones
        window.location.href = "/login";
        props.userLogin(false);
    }

    const showForecast = () => {
        
        if (localStorage.getItem('usuario') === null) {
            //console.log('Entro******showForecast***');
            var latitud = 4.67998418740079;
            var longitud = -74.29473136690441;
            firebase.auth().signInWithEmailAndPassword(dataUserRoot.email, dataUserRoot.password).then(function (userLogin) {
                var currentDate = moment().format("YYYY-MM-DD");
                var currentTime = moment().format("HH:mm");
                //Buscar información del pronostico
                var ref = firebase.database().ref('pronostico/' + currentDate);
                ref.orderByChild("latitud").equalTo(latitud).on("child_added", function (forecastValue) {
                    //console.log("Val:",forecastValue.val());                    
                    if (forecastValue.val() !== null) {
                        props.weatherForecast(forecastValue.val());
                    }
                });

                //Buscar información de alertas
                var ref = firebase.database().ref('alerta/' + currentDate);
                //console.log('Ref:',ref);
                ref.orderByChild("latitud").equalTo(latitud).on("child_added", function (alertValue) {
                    //console.log('Se encontro alerta para el usuario', alertValue);
                    if (alertValue.val() !== null) {
                        //console.log('Valor de la alerta Usuario', alertValue.val());
                        props.weatherAlert(alertValue.val());
                    }
                });

                //Consultar todas las alertas
                ref.orderByChild("latitud").once("value", function (alertValue) {
                    props.weatherAlertAll(alertValue.val());
                });
            });
        } 
    }

    const dataUser = props.user;

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark font-weight-bold">
                <img className="logo-menu" src={logo} onClick={showForecast}/>
                <a className="navbar-brand" href="/donclima">Don Clima</a>
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
                    {!(localStorage.getItem('usuario')) &&
                        <form className="form-inline my-2 my-lg-0">
                            <Link to="/login"><button to="/login" className="btn btn-outline-light my-2 my-sm-0 menu button-green-outline" type="submit">Iniciar Sesión</button></Link>
                            <Link to="/signup"><button className="btn btn-light my-2 my-sm-0 menu button-green" type="submit">Registrarse</button></Link>
                        </form>
                    }
                    {localStorage.getItem('usuario') &&
                        <div className="row">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <h6 className="nav-link" >
                                        Bienvenido {JSON.parse(localStorage.getItem('usuario')).nombre} {JSON.parse(localStorage.getItem('usuario')).apellido}</h6>
                                </li>
                            </ul>
                            <Link to="/modifyuser">
                                <img src={img} className="logo-menu" alt="..." />
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