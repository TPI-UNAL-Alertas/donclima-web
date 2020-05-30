import React, { useState } from 'react';
import "firebase/auth";
import "firebase/database";
import { useFirebaseApp, useUser } from 'reactfire';


export default(props) => {
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [documento, setDocumento] = useState('');
    const [telefono, setTelefono] = useState('');

    const firebase = useFirebaseApp();
    const usuario = useUser();
     
    const submit = async (event) => {
        event.preventDefault();
        await firebase.auth().createUserWithEmailAndPassword(correo, contraseña);
        await firebase.database().ref('usuarios').set({
                nombre: nombre,
                apellido: apellido,
                documento : documento,
                telefono: telefono
            });

        console.log(nombre, apellido, telefono, documento);
    }

    const logout = async () => {
        await firebase.auth().signOut();
    }
  
    return (
        <div>
            {
                !usuario &&
                <form className="needs-validation forms" noValidate onSubmit={submit}>
                    <div className="form-row">
                        <div className="col-md-6 mb-3">
                        <label htmlFor="validationCustom01">Apellidos</label>
                        <input type="text" className="form-control" id="validationCustom01" defaultValue="" onChange={(event) => setApellido(event.target.value)} required/>
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                        </div>
                        <div className="col-md-6 mb-3">
                        <label htmlFor="validationCustom02">Nombres</label>
                        <input type="text" className="form-control" id="validationCustom02" defaultValue="" onChange={(event) => setNombre(event.target.value)} required/>
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-4 mb-3">
                        <label htmlFor="validationCustom01">Numero de Documento</label>
                        <input type="text" className="form-control" id="validationCustom01" defaultValue="" onChange={(event) => setDocumento(event.target.value)} required/>
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                        </div>
                        <div className="col-md-4 mb-3">
                        <label htmlFor="validationCustom01">Correo electrónico</label>
                        <input type="text" className="form-control" id="validationCustom01" defaultValue=""  onChange={(event) => setCorreo(event.target.value)} required/>
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                        </div>
                        <div className="col-md-4 mb-3">
                        <label htmlFor="validationCustom02">Numero celular</label>
                        <input type="text" className="form-control" id="validationCustom02" defaultValue="" onChange={(event) => setTelefono(event.target.value)} required/>
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-5 mb-3">
                            <label htmlFor="inputPassword6">Contraseña</label>
                            <input type="password" id="inputPassword6" className="form-control mx-sm-3" aria-describedby="passwordHelpInline" onChange={(event) => setContraseña(event.target.value)}/>
                            <small id="passwordHelpInline" className="text-muted">
                            Must be 8-20 characters long.
                            </small>
                        </div>
                        <div className="form-group col-md-5 mb-3">
                            <label htmlFor="inputPassword6">Confirmar contraseña</label>
                            <input type="password" id="inputPassword6" className="form-control mx-sm-3" aria-describedby="passwordHelpInline"/>
                            <small id="passwordHelpInline" className="text-muted">
                            Must be 8-20 characters long.
                            </small>
                        </div>
        
                    </div>
                    <div className="form-row">
                    <div className="col-md-7 mb-3">
                        <label htmlFor="validationCustom04">Departamento de residencia</label>
                        <select className="custom-select" id="validationCustom04" required>
                            <option  disabled value="">Choose...</option>
                            <option>...</option>
                        </select>
                        <div className="invalid-feedback">
                            Please select a valid state.
                        </div>
                        </div>
                        <div className="col-md-5 mb-3">
                        <label htmlFor="validationCustom04">Ciudad</label>
                        <select className="custom-select" id="validationCustom04" required>
                            <option  disabled value="">Choose...</option>
                            <option>...</option>
                        </select>
                        <div className="invalid-feedback">
                            Please select a valid state.
                        </div>
                        </div>
                        
                    </div>
                    <div className="form-group">
                        <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required/>
                        <label className="form-check-label" htmlFor="invalidCheck">
                        Acepto recibir alertas por mensaje de texto.
                        </label>
                        <div className="invalid-feedback">
                            You must agree before submitting.
                        </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required/>
                        <label className="form-check-label" htmlFor="invalidCheck">
                        Acepto términos y condiciones.
                        </label>
                        <div className="invalid-feedback">
                            You must agree before submitting.
                        </div>
                        </div>
                    </div>
                    <button className="btn btn-primary" type="submit">Enviar</button>
                </form>
            }
            {
                usuario &&
                <button className="btn btn-primary" onClick={logout}>Salir</button>
            }
        </div>
    );
}
