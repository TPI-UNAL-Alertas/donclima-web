import React from 'react';
import FormSignUp from './FormSignUp';

class LogIn extends React.Component{
    render() {
        return (
            <div className="background-form">
                <div className="row justify-content-md-center">
                    <div className="col-md-7">
                        <div className="shadow-sm p-3 mb-5 bg-white rounded shadow-form">
                            <h2>Iniciar Sesión</h2>
                            <hr/>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Correo electrónico</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                                    <small id="emailHelp" className="form-text text-muted"></small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Contraseña</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1"/>
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
}
export default LogIn;