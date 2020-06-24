import React, { useState } from 'react';
import "firebase/auth";
import "firebase/database";
import { useFirebaseApp, useUser } from 'reactfire';
import { departamentos } from '../colombia.json'
import moment from 'moment';

const FormSignUp = props => {

    ///refs
    const lastnameUserRef = React.createRef();
    const nameUserRef = React.createRef();
    const documentRef = React.createRef();
    const emailRef = React.createRef();
    const phoneRef = React.createRef();
    const passwordRef = React.createRef();
    const departmentRef = React.createRef();
    const cityRef = React.createRef();

    const [departamento, setDepartamento] = useState("");
    const [ciudades, setCiudades] = useState([]);

    const firebase = useFirebaseApp();
    const user = useUser();
    const markerUserValue = props.markerUser;

    const newUser = async (e) => {
        e.preventDefault();

        if (markerUserValue === null || markerUserValue.length === 0) {
            alert("Por favor indique en el mapa la ubicación de su residencia");
            return;
        }

        const name = nameUserRef.current.value,
            lastname = lastnameUserRef.current.value,
            document = documentRef.current.value,
            email = emailRef.current.value,
            phone = phoneRef.current.value,
            password = passwordRef.current.value,
            department = departmentRef.current.value.toUpperCase(),
            city = cityRef.current.value.toUpperCase(),
            lat = markerUserValue[0].lat,
            lng = markerUserValue[0].lng;

        if (document !== null && document.length > 0) {

            await firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(function () {

                    firebase.database().ref('usuarios/' + document).set({
                        nombre: name,
                        apellido: lastname,
                        correo: email,
                        documento: document,
                        telefono: phone,
                        departamento: department,
                        ciudad: city,
                        latitud: lat,
                        longitud: lng,
                        departamento_municipio: department + '-' + city
                    });

                    //Asociar pronostico y alerta al usuario
                    associateForecast();
                    alert("Registro realizado exitosamente");

                    window.location.href = "/";
                })
                .catch(function (error) {
                    alert("Se presento el siguiente error: " + error.message);
                });
        } else {
            alert("Debe diligenciar todos los campos");
        }


    }

    const associateForecast = () => {

        const document = documentRef.current.value,
            latitud = markerUserValue[0].lat,
            longitud = markerUserValue[0].lng;

        var latitudS, longitudS, ref;
        var currentDate = moment().format("YYYY-MM-DD");

        const department = departmentRef.current.value.toUpperCase(),
            city = cityRef.current.value.toUpperCase();

        //Buscar información del pronostico
        ref = firebase.database().ref('pronostico/' + currentDate);

        ref.orderByChild("departamento_municipio")
            .equalTo(department + '-' + city)
            .on("child_added", function (forecastValue) {

                if (forecastValue.val() !== null) {
                    latitudS = forecastValue.val().latitud - latitud;
                    longitudS = forecastValue.val().longitud - longitud;

                    firebase.database().ref('usuarioPronostico/' + document + '/' + currentDate + '/' + forecastValue.key).set({
                        documento: document,
                        latitud: latitudS,
                        longitud: longitudS,
                        total: latitudS + longitudS
                    });
                }
            });

        //Buscar información de alertas
        ref = firebase.database().ref('alerta/' + currentDate);
        ref.orderByChild("departamento_municipio")
            .equalTo(department + '-' + city)
            .on("child_added", function (alertValue) {

                if (alertValue.val() !== null) {

                    latitudS = alertValue.val().latitud - latitud;
                    longitudS = alertValue.val().longitud - longitud;

                    firebase.database().ref('usuarioAlerta/' + document + '/' + currentDate + '/' + alertValue.key).set({
                        documento: document,
                        latitud: latitudS,
                        longitud: longitudS,
                        total: latitudS + longitudS
                    });
                }
            });
    }

    const agregarCiudades = (departamento) => {
        for (var i in departamentos) {
            if (departamentos[i].departamento == departamento) {
                setCiudades(departamentos[i].ciudades)
            }
        }
    }

    return (
        <form className="needs-validation" noValidate onSubmit={newUser}>
            <div className="forms">
                <div className="form-row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="validationCustom01">Apellidos</label>
                        <input ref={lastnameUserRef} type="text" className="form-control" id="validationCustom01" defaultValue="" required />
                        <div className="valid-feedback">
                            Looks good!
                    </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="validationCustom02">Nombres</label>
                        <input ref={nameUserRef} type="text" className="form-control" id="validationCustom02" defaultValue="" required />
                        <div className="valid-feedback">
                            Looks good!
                    </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-4 mb-3">
                        <label htmlFor="validationCustom01">Numero de Documento</label>
                        <input ref={documentRef} type="text" className="form-control" id="validationCustom01" defaultValue="" required />
                        <div className="valid-feedback">
                            Looks good!
                    </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="validationCustom01">Correo electrónico</label>
                        <input ref={emailRef} type="text" className="form-control" id="validationCustom01" defaultValue="" required />
                        <div className="valid-feedback">
                            Looks good!
                    </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="validationCustom02">Numero celular</label>
                        <input ref={phoneRef} type="text" className="form-control" id="validationCustom02" defaultValue="" required />
                        <div className="valid-feedback">
                            Looks good!
                    </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-5 mb-3">
                        <label htmlFor="inputPassword6">Contraseña</label>
                        <input ref={passwordRef} type="password" id="inputPassword6" className="form-control mx-sm-3" aria-describedby="passwordHelpInline" />
                        <small id="passwordHelpInline" className="text-muted">
                            Mas de 8-20 caracteres de longitud.
                        </small>
                    </div>
                    <div className="form-group col-md-5 mb-3">
                        <label htmlFor="inputPassword6">Confirmar contraseña</label>
                        <input type="password" id="inputPassword6" className="form-control mx-sm-3" aria-describedby="passwordHelpInline" />
                        <small id="passwordHelpInline" className="text-muted">
                            Mas de 8-20 caracteres de longitud.
                        </small>
                    </div>

                </div>
                <div className="form-row">
                    <div className="col-md-7 mb-3">
                        <label htmlFor="validationCustom04">Departamento de residencia</label>
                        <select ref={departmentRef} className="custom-select" id="validationCustom04" onChange={(event) => setDepartamento(event.target.value)} onClick={(event) => agregarCiudades(event.target.value)} required>
                            {departamentos.map(({ id, departamento }) => (
                                <option key={id} value={departamento}>{departamento}</option>
                            ))}
                        </select>
                        <div className="invalid-feedback">
                            Please select a valid state.
                    </div>
                    </div>
                    <div className="col-md-5 mb-3">
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
                        <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required />
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
                        <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required />
                        <label className="form-check-label" htmlFor="invalidCheck">
                            Acepto términos y condiciones.
                    </label>
                        <div className="invalid-feedback">
                            You must agree before submitting.
                    </div>
                    </div>
                </div>
            </div>
            <button className="btn btn-outline-light btn-form button-blue-outline" type="submit">Registrarse</button>
        </form>

    );

}
export default FormSignUp;
