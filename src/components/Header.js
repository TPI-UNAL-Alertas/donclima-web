import React from 'react';
import {Link} from 'react-router-dom';
import "firebase/auth";
import "firebase/database";
import { useFirebaseApp, useUser } from 'reactfire';

const Header = (props) =>{

    
        const login=props.login;
        const firebase=useFirebaseApp();        
        //const user = useUser();

        //firebase.auth();

        //console.log("desde header");
        //console.log("correo user header",user);
/*
        if (user!==null){
            console.log("correo user header",user.email);

            //Consultar información del usuario logeado por email                
            var ref = firebase.database().ref('usuarios');
            ref.orderByChild("correo").equalTo(user.email).on("child_added",function(snapshot){
                
            //console.log('Key', snapshot.key);
            // Coleccion 'usuarios' en firebase
            var usuarioLogueado = firebase.database().ref('usuarios/'+snapshot.key);
            //console.log('Usuario:',usuarioLogueado);
            usuarioLogueado.on("value", function(valorLogueado){
                console.log("Valor logueado", valorLogueado.val());
                // Envia el objeto de los datos del usuario al state del Router
                //props.userSesion(valorLogueado.val());
                console.log("Valor logueado", valorLogueado.val().nombre);
                //console.log("Valor logueado", valorLogueado.val().documento);

                });
            
            });
        }*/

        // Cierra sesion en firebase
        const logout = async(e) => {
            e.preventDefault();

            await firebase.auth().signOut();
            console.log('cerro sesion');

            // Envia false al state.login de Router para mostrar botones
            props.userLogin(false);
        }
        
        const dataUser=props.user;

        console.log(dataUser);
        
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
                        { !login &&
                        <form className="form-inline my-2 my-lg-0">
                        <Link to="/login"><button to="/login" className="btn btn-outline-info my-2 my-sm-0 menu" type="submit">Iniciar Sesión</button></Link>
                        <Link to="/signup"><button className="btn btn-info my-2 my-sm-0 menu" type="submit">Registrarse</button></Link>
                        </form>
                        }
                        { login &&
                        <div className="row">
                            <h5 className="text-white align-bottom">Bienvenido {dataUser.nombre}</h5>
                            <button className="btn btn-danger my-2 my-sm-0 menu" type="submit" onClick={logout}>Cerrar Sesión</button>
                        </div>
                            
                        } 
                    </div>
                    </nav>
            </header>
            
        );
    
}
export default Header;