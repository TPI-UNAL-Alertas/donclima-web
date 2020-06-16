import React, {useState} from 'react';
import "firebase/auth";
import "firebase/database";
import { useFirebaseApp, useUser } from 'reactfire';
import {departamentos}  from '../colombia.json'


const FormUser = props => {

    const lastnameUserRef=React.createRef();
    const nameUserRef=React.createRef();
    const documentRef=React.createRef();
    const emailRef=React.createRef();
    const phoneRef=React.createRef();
    const passwordRef=React.createRef();
    const departmentRef=React.createRef();
    const cityRef=React.createRef();

    const [departamento, setDepartamento] = useState("");
    const [ciudades, setCiudades] = useState([]);

    const firebase = useFirebaseApp();
    const user = useUser();
    const documento =  JSON.parse(localStorage.getItem('usuario')).documento;

    function updateUsuario(e) {
        e.preventDefault();
        console.log(phoneRef.current.value);
        firebase.database().ref('usuarios/' + documento).update({
            ciudad: cityRef.current.value,
            departamento: departmentRef.current.value,
            telefono: phoneRef.current.value
        });      
    }
    
    const agregarCiudades = (departamento) => {
        for(var i in departamentos) {
            if (departamentos[i].departamento == departamento) {
                setCiudades(departamentos[i].ciudades)
            }
        }
    }
          
	  	  
    return (

            <form className="needs-validation " noValidate >
                <div className="forms">
                <div className="form-row">
                    <div className="col-md-3 mb-3">
                        <label htmlFor="validationCustom01">Apellidos</label>
                        <input ref={lastnameUserRef} type="text" className="form-control" id="validationCustom01" defaultValue={JSON.parse(localStorage.getItem('usuario')).apellido} required/>
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                    <div className="col-md-3 mb-3">
                        <label htmlFor="validationCustom02">Nombres</label>
                        <input ref={nameUserRef} type="text" className="form-control" id="validationCustom02" defaultValue={JSON.parse(localStorage.getItem('usuario')).nombre} required/>
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="validationCustom02">Numero celular</label>
                        <input ref={phoneRef} type="text" className="form-control" id="validationCustom02" defaultValue={JSON.parse(localStorage.getItem('usuario')).telefono} required/>
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-4 mb-3">
                        <label htmlFor="validationCustom01">Numero de Documento</label>
                        <input ref={documentRef} type="text" className="form-control" id="validationCustom01" defaultValue={JSON.parse(localStorage.getItem('usuario')).documento} required/>
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="validationCustom01">Correo electrónico</label>
                        <input ref={emailRef} type="text" className="form-control" id="validationCustom01" defaultValue={JSON.parse(localStorage.getItem('usuario')).correo} required/>
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-4 mb-3">
                        <label htmlFor="validationCustom04">Departamento de residencia</label>
                        <select ref={departmentRef} className="custom-select" id="validationCustom04" onChange={(event) => setDepartamento(event.target.value)} onClick={(event) => agregarCiudades(event.target.value)} required>
                            {departamentos.map(({id, departamento}) => (
                                <option key={id} value={departamento}>{departamento}</option>
                            ))}
                        </select>
                        <div className="invalid-feedback">
                            Please select a valid state.
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="validationCustom04">Ciudad</label>
                        <select ref={cityRef} className="custom-select" id="validationCustom04" required>
                            {ciudades.map((ciudad, i) => (
                                <option key={i} value={ciudad}>{ciudad}</option>
                            ))}
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
                        Acepto términos y condiciones.
                    </label>
                    <div className="invalid-feedback">
                        You must agree before submitting.
                    </div>
                    </div>
                </div>
                </div>
                <button className="btn btn-outline-light btn-form button-blue-outline" type="submit" onClick={updateUsuario}>Guardar</button>
            </form>
    );
}
export default FormUser;
