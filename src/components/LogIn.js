import React,{Suspense} from 'react';
import "firebase/auth";
import "firebase/database";
import { useFirebaseApp, useUser } from 'reactfire';

const LogIn =(props)=>{

    const emailRef=React.createRef();
    const passwordRef=React.createRef();

    const firebase = useFirebaseApp();
    const user = useUser();

    const login= (e)=>{
        e.preventDefault();

        const email=emailRef.current.value;
        const password=passwordRef.current.value;
        
        console.log("Email ingresaddo",emailRef.current.value);

        logout();
        // Envia true al state.login de Router para ocultar botones
        props.userLogin(true);
        
        firebase.auth().signInWithEmailAndPassword(email, password).then(function(userLogin){
            console.log("Email validado ...", userLogin.user.email);
            findUser(userLogin.user.email); 
            //console.log("user ....", user);
            
        });

        /*firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode === 'auth/wrong-password') {
              alert('Wrong password.');
            } else {
              alert(errorMessage);
            }
            console.log(error);
            document.getElementById('quickstart-sign-in').disabled = false;
            // [END_EXCLUDE]
          });*/

          
          //console.log("user login", user);
          //findUser(user);      
          //window.location="/";
        
    }

    // Consultar informacion del usuario en firebase
    const findUser=(correoUsuario)=>{

        //console.log("correo usser",correoUsuario);
        //Consultar información del usuario logeado por email                
        var ref = firebase.database().ref('usuarios');
        ref.orderByChild("correo").equalTo(correoUsuario).on("child_added",function(snapshot){
            
        //console.log('Key', snapshot.key);
        // Coleccion 'usuarios' en firebase
        var usuarioLogueado = firebase.database().ref('usuarios/'+snapshot.key);
        //console.log('Usuario:',usuarioLogueado);
        usuarioLogueado.on("value", function(valorLogueado){
            //console.log("Valor logueado", valorLogueado.val());
            // Envia el objeto de los datos del usuario al state del Router
            props.userSesion(valorLogueado.val());
            console.log("Valor logueado", valorLogueado.val().nombre);
            //console.log("Valor logueado", valorLogueado.val().documento);

            });
        
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