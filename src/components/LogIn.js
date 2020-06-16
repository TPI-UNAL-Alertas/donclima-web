import React, { Suspense } from 'react';
import "firebase/auth";
import "firebase/database";
import { useFirebaseApp, useUser } from 'reactfire';
import moment from 'moment';
import person from '../img/logo/personaje01.png';

const LogIn = (props) => {

    const emailRef = React.createRef();
    const passwordRef = React.createRef();
    const firebase = useFirebaseApp();
    const user = useUser();

    const login = (e) => {
        e.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        console.log("Email ingresaddo", emailRef.current.value);

        logout();
        // Envia true al state.login de Router para ocultar botones
        props.userLogin(true);

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function (userLogin) {
                findUser(userLogin.user.email);
            })
            .catch(function (error) {
                alert("Ha ocurrido un error en la autenticación " + error.message);
            });
    }

    // Consultar informacion del usuario en firebase
    const findUser = (correoUsuario) => {

        //console.log("correo usser",correoUsuario);
        //Consultar información del usuario logeado por email                
        var ref = firebase.database().ref('usuarios');
        ref.orderByChild("correo").equalTo(correoUsuario).on("child_added", function (snapshot) {

            //console.log('Key', snapshot.key);
            // Coleccion 'usuarios' en firebase
            var usuarioLogueado = firebase.database().ref('usuarios/' + snapshot.key);
            //console.log('Usuario:',usuarioLogueado);
            usuarioLogueado.on("value", function (valorLogueado) {
                //console.log("Valor logueado", valorLogueado.val());
                // Envia el objeto de los datos del usuario al state del Router
                props.userSesion(valorLogueado.val());
                localStorage.setItem('usuario', JSON.stringify(valorLogueado.val()));
                findPronostico(valorLogueado.val())
            });
            window.location.href = "/";
        });

    }

    const findPronostico = (usuario) => {
        var latitud = usuario.latitud;
        var longitud = usuario.longitud;
        console.log('Cargue por lat:', latitud);
        console.log('Cargue por lng:', longitud);
        var currentDate = moment().format("YYYY-MM-DD");
        var currentTime = moment().format("HH:mm");
        //Buscar información del pronostico
        var ref = firebase.database().ref('pronostico/' + currentDate);
        ref.orderByChild("latitud").equalTo(latitud).on("child_added", function (forecastValue) {
            //console.log("Val:",forecastValue.val());                    
            if (forecastValue.val() !== null) {
                localStorage.setItem('pronosticoUser', JSON.stringify(forecastValue.val()));
                props.weatherForecast(forecastValue.val());
            }
        });

        //Buscar información de alertas
        var ref = firebase.database().ref('alerta/' + currentDate);
        //console.log('Ref:',ref);
        ref.orderByChild("latitud").equalTo(latitud).on("child_added", function (alertValue) {
            //console.log('Se encontro alerta para el usuario', alertValue);
            if (alertValue.val() !== null) {
                localStorage.setItem('alertaUser', JSON.stringify(alertValue.val()));
                props.weatherAlert(alertValue.val());
            }
        });

    }


    // Cierra sesion en firebase
    const logout = () => {
        console.log('entra');
        firebase.auth().signOut();
        console.log('sale');
    }
        return (
            <div className="background-form">
                <div className="home-page shadow-sm p-3 mb-5 bg-white rounded">
                <div className="row justify-content-md-center">
                
                    <div className="col-md-7">
                        <div className="shadow-sm p-3 mb-5 bg-white rounded shadow-form">
                            
                            <h2>Iniciar Sesión</h2>
                            <div>
                                <img className="logo-login" src={person}/>
                            </div>
                            <hr/>
                            <form onSubmit={login}>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Correo electrónico</label>
                                    <input ref={emailRef} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                                    <small id="emailHelp" className="form-text text-muted"></small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Contraseña</label>
                                    <input ref={passwordRef} type="password" className="form-control" id="exampleInputPassword1"/>
                                </div>
                                <div className="form-group form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                    <label className="form-check-label" htmlFor="exampleCheck1">Recordarme en este equipo</label>
                                </div>
                                <button type="submit" className="btn btn-outline-light btn-form button-blue-outline">Iniciar Sesión</button>
                            </form>
                                                  
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );

}
export default LogIn;