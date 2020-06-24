import React, { useState } from 'react';
import "firebase/auth";
import "firebase/database";
import { useFirebaseApp, useUser } from 'reactfire';
import { departamentos } from '../colombia.json'
import moment from 'moment';

const FormUser = props => {

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
    const documento = JSON.parse(localStorage.getItem('usuario')).documento;
    const markerUserValue = props.markerUser;

    const updateUsuario = async (e) => {
        //function updateUsuario(e) {
        e.preventDefault();
        console.log(phoneRef.current.value);

        const lat = markerUserValue[0].lat,
            lng = markerUserValue[0].lng;

        firebase.database().ref('usuarios/' + documento).update({
            ciudad: cityRef.current.value.toUpperCase(),
            departamento: departmentRef.current.value.toUpperCase(),
            telefono: phoneRef.current.value,
            latitud: lat,
            longitud: lng,
            departamento_municipio: departmentRef.current.value.toUpperCase() + '-' + cityRef.current.value.toUpperCase()
        });

        firebase.database().ref('usuarios/' + documento)
            .on("value", function (valorLogueado) {
                props.userSesion(valorLogueado.val());
                localStorage.setItem('usuario', JSON.stringify(valorLogueado.val()));
                associateForecastUser(valorLogueado);
                findPronostico(valorLogueado.val())
                alert("Se modificó con exito su información.");
            });

    }

    //Metodo que asocia los pronosticos y alertas del usuario logueado
    const associateForecastUser = async (userData) => {
        var latitudS, longitudS;
        var currentDate = moment().format("YYYY-MM-DD");

        // Se limpia los pronosticos y alertas de la ubicación anterior.
        firebase.database().ref('usuarioPronostico/'
            + userData.val().documento + '/'
            + currentDate).remove();

        firebase.database().ref('usuarioAlerta/'
            + userData.val().documento + '/'
            + currentDate).remove();

        //Buscar información del pronostico
        firebase.database().ref('pronostico/' + currentDate)
            .orderByChild("departamento_municipio")
            .equalTo(userData.val().departamento_municipio)
            .on("child_added", function (forecastValue) {

                if (forecastValue.val() !== null) {

                    latitudS = forecastValue.val().latitud - userData.val().latitud;
                    longitudS = forecastValue.val().longitud - userData.val().longitud;

                    firebase.database().ref('usuarioPronostico/' + userData.val().documento + '/' + currentDate + '/' + forecastValue.key).set({
                        documento: userData.val().documento,
                        latitud: latitudS,
                        longitud: longitudS,
                        total: Math.abs(latitudS + longitudS)
                    });
                }
            });


        //Buscar información de alertas
        firebase.database().ref('alerta/' + currentDate)
            .orderByChild("departamento_municipio")
            .equalTo(userData.val().departamento_municipio)
            .on("child_added", function (alertValue) {
                if (alertValue.val() !== null) {

                    latitudS = alertValue.val().latitud - userData.val().latitud;
                    longitudS = alertValue.val().longitud - userData.val().longitud;

                    firebase.database().ref('usuarioAlerta/' + userData.val().documento + '/' + currentDate + '/' + alertValue.key).set({
                        documento: userData.val().documento,
                        latitud: latitudS,
                        longitud: longitudS,
                        total: Math.abs(latitudS + longitudS)
                    });

                }
            });
    }

    //Método que consulta los pronosticos y alertas del usuario logueado
    const findPronostico = async (usuario) => {

        localStorage.setItem('pronosticoUser', '{"cobertura_total_nubosa":0,"cod_div":0,"departamento":"","direccion_viento":0,"fecha":"","hora":"","humedad":0,"latitud":0,"longitud":0,"municipio":0,"precipitacion":0,"probabilidad_tormenta":0,"pronostico":"","punto_rocio":0,"region":"","temperatura":0,"velocidad_viento":0}');
        localStorage.setItem('alertaUser', '{"cod_div":"","departamento":"","fecha":"","fenomeno":"","hora":"","latitud":0,"longitud":0,"municipio":"","nivel":"","region":"","sinopsis":"No se repotaron alertas en la zona."}');
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
                                    //window.location.href = "/";
                                }
                            });
                    } else {
                        localStorage.setItem('alertaUser', '{"cod_div":"","departamento":"","fecha":"","fenomeno":"","hora":"","latitud":0,"longitud":0,"municipio":"","nivel":"","region":"","sinopsis":"No se repotaron alertas en la zona."}');
                        //window.location.href = "/";
                    }

                } else {
                    //window.location.href = "/";
                }
            });
        //window.location.href = "/";

    }

    const agregarCiudades = (departamento) => {
        for (var i in departamentos) {
            if (departamentos[i].departamento == departamento) {
                setCiudades(departamentos[i].ciudades)
            }
        }
    }


    return (

        <form className="needs-validation " noValidate >
            <div className="forms">
                <div className="form-row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="validationCustom01">Apellidos</label>
                        <input ref={lastnameUserRef} type="text" className="form-control" id="validationCustom01" defaultValue={JSON.parse(localStorage.getItem('usuario')).apellido} required disabled />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="validationCustom02">Nombres</label>
                        <input ref={nameUserRef} type="text" className="form-control" id="validationCustom02" defaultValue={JSON.parse(localStorage.getItem('usuario')).nombre} required disabled />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>

                </div>
                <div className="form-row">
                    <div className="col-md-4 mb-3">
                        <label htmlFor="validationCustom01">Numero de Documento</label>
                        <input ref={documentRef} type="text" className="form-control" id="validationCustom01" defaultValue={JSON.parse(localStorage.getItem('usuario')).documento} required disabled />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="validationCustom01">Correo electrónico</label>
                        <input ref={emailRef} type="text" className="form-control" id="validationCustom01" defaultValue={JSON.parse(localStorage.getItem('usuario')).correo} required disabled />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="validationCustom02">Numero celular</label>
                        <input ref={phoneRef} type="text" className="form-control" id="validationCustom02" defaultValue={JSON.parse(localStorage.getItem('usuario')).telefono} required />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
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
