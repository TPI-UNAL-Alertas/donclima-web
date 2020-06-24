import React, { Suspense } from 'react';
import "firebase/auth";
import "firebase/database";
import { useFirebaseApp} from 'reactfire';
import moment from 'moment';
import person from '../img/logo/personaje01.png';

const LogIn = (props) => {

    const emailRef = React.createRef();
    const passwordRef = React.createRef();
    const firebase = useFirebaseApp();
    
    const login = (e) => {
        e.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

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

        //Consultar información del usuario logeado por email                
        var ref = firebase.database().ref('usuarios');
        ref.orderByChild("correo").equalTo(correoUsuario).on("child_added", function (snapshot) {

            // Coleccion 'usuarios' en firebase
            var usuarioLogueado = firebase.database().ref('usuarios/' + snapshot.key);

            usuarioLogueado.on("value", function (valorLogueado) {

                // Envia el objeto de los datos del usuario al state del Router
                props.userSesion(valorLogueado.val());
                localStorage.setItem('usuario', JSON.stringify(valorLogueado.val()));
                findPronostico(valorLogueado.val())
            });
            //window.location.href = "/";
        });

    }

    //Metodo para buscar pronostico y alertas del usuario logueado
    const findPronostico = (usuario) => {

        localStorage.setItem('pronosticoUser', '{"cobertura_total_nubosa":0,"cod_div":0,"departamento":"","direccion_viento":0,"fecha":"","hora":"","humedad":0,"latitud":0,"longitud":0,"municipio":0,"precipitacion":0,"probabilidad_tormenta":0,"pronostico":"","punto_rocio":0,"region":"","temperatura":0,"velocidad_viento":0}');
        localStorage.setItem('alertaUser', '{"cod_div":"","departamento":"","fecha":"","fenomeno":"","hora":"","latitud":0,"longitud":0,"municipio":"","nivel":"","region":"","sinopsis":""}');

        var currentDate = moment().format("YYYY-MM-DD");
        //Buscar información del pronostico
        var ref = firebase.database().ref('usuarioPronostico/' + usuario.documento + '/' + currentDate);

        ref.orderByChild("total").limitToLast(1).on("child_added", function (dataFound) {

            firebase.database().ref('pronostico/' + currentDate + '/' + dataFound.key)
                .on("value", function (dataFound2) {

                    if (dataFound2.val() !== null) {
                        localStorage.setItem('pronosticoUser', JSON.stringify(dataFound2.val()));
                        //props.weatherForecast(dataFound.val());
                    }
                });
        });

        //Buscar información de alertas
        firebase.database().ref('usuarioAlerta/' + usuario.documento + '/' + currentDate)
            .orderByChild("total")
            .limitToFirst(1)
            .on("child_added", function (dataFound) {
                if (dataFound.val() !== null) {

                    if (dataFound.val().total < 0.1) {
                        firebase.database().ref('alerta/' + currentDate + '/' + dataFound.key)
                            .on("value", function (dataFound2) {

                                if (dataFound2.val() !== null) {
                                    localStorage.setItem('alertaUser', JSON.stringify(dataFound2.val()));
                                    //props.weatherAlert(dataFound.val());
                                    window.location.href = "/";
                                }
                            });
                    } else {
                        localStorage.setItem('alertaUser', '{"cod_div":"","departamento":"","fecha":"","fenomeno":"","hora":"","latitud":0,"longitud":0,"municipio":"","nivel":"","region":"","sinopsis":"No se repotaron alertas en la zona."}');
                        window.location.href = "/";
                    }

                } else {
                    window.location.href = "/";
                }
            });
        window.location.href = "/";
    }


    // Cierra sesion en firebase
    const logout = () => {
        firebase.auth().signOut();
    }
    return (
        <div className="background-form">
            <div className="home-page shadow-sm p-3 mb-5 bg-white rounded">
                <div className="row justify-content-md-center">

                    <div className="col-md-7">
                        <div className="shadow-sm p-3 mb-5 bg-white rounded shadow-form">

                            <h2>Iniciar Sesión</h2>
                            <div>
                                <img className="logo-login" src={person} />
                            </div>
                            <hr />
                            <form onSubmit={login}>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Correo electrónico</label>
                                    <input ref={emailRef} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    <small id="emailHelp" className="form-text text-muted"></small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Contraseña</label>
                                    <input ref={passwordRef} type="password" className="form-control" id="exampleInputPassword1" />
                                </div>
                                <div className="form-group form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
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