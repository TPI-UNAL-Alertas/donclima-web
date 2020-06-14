import React, { Suspense } from 'react';
import "firebase/auth";
import "firebase/database";
import { useFirebaseApp, useUser } from 'reactfire';


const LogIn = (props) => {

    const emailRef = React.createRef();
    const passwordRef = React.createRef();

    const firebase = useFirebaseApp();
    const user = useUser();

    const login = (e) => { 
        e.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        
        props.userLogin(true);
    
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(userLogin) {
            findUser(userLogin.user.email);
        })
        .catch(function(error) {
            alert("Ha ocurrido un error en la autenticación " + error.message);
        });        
    }

    // Consultar informacion del usuario en firebase
    const findUser = (correoUsuario) => {
        //Consultar información del usuario logeado por email                
        var ref = firebase.database().ref('usuarios');
        console.log(ref)
        ref.orderByChild("correo").equalTo(correoUsuario).on("child_added", function(snapshot) {
            console.log(snapshot.key);
                // Coleccion 'usuarios' en firebase
            var usuarioLogueado = firebase.database().ref('usuarios/' + snapshot.key);
            usuarioLogueado.on("value", function(valorLogueado) {

                // Envia el objeto de los datos del usuario al state del Router
                props.userSesion(valorLogueado.val());
                localStorage.setItem('usuario', JSON.stringify(valorLogueado.val()));
            }); 
            window.location.href = "/";
        });
    }
    
    return (
        <div className="background-form">
            <div className="row justify-content-md-center">
                <div className="col-md-7">
                    <div className="shadow-sm p-3 mb-5 bg-white rounded shadow-form">
                        <h2>Iniciar Sesión</h2>
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
                            <button type="submit" className="btn btn-warning btn-form">Iniciar Sesión</button>
                        </form>
                                                
                    </div>

                </div>
            </div>
            
        </div>
    );
}
export default LogIn;