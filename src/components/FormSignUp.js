import React from 'react';
import "firebase/auth";
import "firebase/database";
import { useFirebaseApp, useUser } from 'reactfire';

const FormSignUp = props =>{
        
    ///refs
    const lastnameUserRef=React.createRef();
    const nameUserRef=React.createRef();
    const documentRef=React.createRef();
    const emailRef=React.createRef();
    const phoneRef=React.createRef();
    const passwordRef=React.createRef();
    const departmentRef=React.createRef();
    const cityRef=React.createRef();

    const firebase = useFirebaseApp();
    const user = useUser();

    const newUser= async (e)=>{
        e.preventDefault();


        const name=nameUserRef.current.value,
            lastname=lastnameUserRef.current.value,
            document=documentRef.current.value,
            email=emailRef.current.value,
            phone=phoneRef.current.value,
            password=passwordRef.current.value,
            department=departmentRef.current.value,
            city=cityRef.current.value;

            console.log(name,city);

            await firebase.auth().createUserWithEmailAndPassword(email, password);
            await firebase.database().ref('usuarios/'+document).set({
                nombre: name,
                apellido: lastname,
                correo: email,
                documento : document,
                telefono: phone,
                departamento: department,
                ciudad: city
            });

            console.log('usuario',user);

    }
    
        return (
            <form className="needs-validation" noValidate onSubmit={newUser}>
                <div className="forms">
                <div className="form-row">
                    <div className="col-md-6 mb-3">
                    <label htmlFor="validationCustom01">Apellidos</label>
                    <input ref={lastnameUserRef} type="text" className="form-control" id="validationCustom01" defaultValue="" required/>
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                    </div>
                    <div className="col-md-6 mb-3">
                    <label htmlFor="validationCustom02">Nombres</label>
                    <input ref={nameUserRef} type="text" className="form-control" id="validationCustom02" defaultValue="" required/>
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-4 mb-3">
                    <label htmlFor="validationCustom01">Numero de Documento</label>
                    <input ref={documentRef} type="text" className="form-control" id="validationCustom01" defaultValue="" required/>
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                    </div>
                    <div className="col-md-4 mb-3">
                    <label htmlFor="validationCustom01">Correo electrónico</label>
                    <input ref={emailRef} type="text" className="form-control" id="validationCustom01" defaultValue="" required/>
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                    </div>
                    <div className="col-md-4 mb-3">
                    <label htmlFor="validationCustom02">Numero celular</label>
                    <input ref={phoneRef} type="text" className="form-control" id="validationCustom02" defaultValue="" required/>
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-5 mb-3">
                        <label htmlFor="inputPassword6">Contraseña</label>
                        <input ref={passwordRef} type="password" id="inputPassword6" className="form-control mx-sm-3" aria-describedby="passwordHelpInline"/>
                        <small id="passwordHelpInline" className="text-muted">
                        Mas de 8-20 caracteres de longitud.
                        </small>
                    </div>
                    <div className="form-group col-md-5 mb-3">
                        <label htmlFor="inputPassword6">Confirmar contraseña</label>
                        <input type="password" id="inputPassword6" className="form-control mx-sm-3" aria-describedby="passwordHelpInline"/>
                        <small id="passwordHelpInline" className="text-muted">
                        Mas de 8-20 caracteres de longitud.
                        </small>
                    </div>

                </div>
                <div className="form-row">
                <div className="col-md-7 mb-3">
                    <label htmlFor="validationCustom04">Departamento de residencia</label>
                    <select ref={departmentRef} className="custom-select" id="validationCustom04" required>
                        <option  disabled value="">Choose...</option>
                        <option>...</option>
                    </select>
                    <div className="invalid-feedback">
                        Please select a valid state.
                    </div>
                    </div>
                    <div className="col-md-5 mb-3">
                    <label htmlFor="validationCustom04">Ciudad</label>
                    <select ref={cityRef} className="custom-select" id="validationCustom04" required>
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
                </div>
                <button className="btn btn-warning btn-form" type="submit">Registrarse</button>
            </form>
            
        );
    
}
export default FormSignUp;
