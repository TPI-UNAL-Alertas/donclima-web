import React from 'react';
import "firebase/auth";
import "firebase/database";
import { useFirebaseApp, useUser } from 'reactfire';
import data from '../data.json';
import alertData from '../alert.json';
import moment from 'moment';

const AutomaticProcess = props => {

    const firebase = useFirebaseApp();
    const dataUserRoot = { email: 'donclima@donclima.com', password: '12345678' };
/*
    //Cron para cargar el pronostico de día.
    var cron = require('node-cron');
    var conCron = 0;
    cron.schedule('* * * * *', () => {
        console.log('Inicio medio minuto', conCron);
        if (conCron == 0) {
            //console.log('Se ejecuta cada medio minuto');
            //loadForecast();
            if (localStorage.getItem('usuario') === null) {
                showForecast();
            }
            conCron++;
        }
        //console.log('Fin medio minuto');
    });*/

    const loadForecast = () => {
        firebase.auth().signInWithEmailAndPassword(dataUserRoot.email, dataUserRoot.password).then(function (userLogin) {
            var cont = 0;
            data.map(forecastDay => {
                firebase.database().ref('pronostico/' + forecastDay['Fecha'] + '/' + cont).set({
                    cobertura_total_nubosa: forecastDay['Cobertura total nubosa'],
                    cod_div: forecastDay['Cod_Div'],
                    departamento: forecastDay['Departamento'],
                    direccion_viento: forecastDay['Direccion del Viento'],
                    fecha: forecastDay['Fecha'],
                    hora: forecastDay['Hora'],
                    humedad: forecastDay['Humedad'],
                    latitud: forecastDay['Latitud'],
                    longitud: forecastDay['Longitud'],
                    municipio: forecastDay['Municipio'],
                    precipitacion: forecastDay['Precipitacion (mm/h)'],
                    municipio: forecastDay['Presion'],
                    probabilidad_tormenta: forecastDay['Probabilidad de Tormenta'],
                    pronostico: forecastDay['Pronostico'],
                    punto_rocio: forecastDay['Punto de Rocio'],
                    region: forecastDay['Region'],
                    temperatura: forecastDay['Temperatura'],
                    velocidad_viento: forecastDay['Velocidad del Viento']
                });
                cont++;
            });

            //Cargar alarmas
            cont = 0;
            alertData.map(dataUpload => {
                firebase.database().ref('alerta/' + dataUpload['Fecha'] + '/' + cont).set({
                    cod_div: dataUpload['Cod_Div'],
                    latitud: dataUpload['Latitud'],
                    longitud: dataUpload['Longitud'],
                    fenomeno: dataUpload['Fenomeno'],
                    nivel: dataUpload['Nivel'],
                    municipio: dataUpload['Municipio'],
                    departamento: dataUpload['Departamento'],
                    region: dataUpload['Region'],
                    fecha: dataUpload['Fecha'],
                    hora: dataUpload['Hora'],
                    sinopsis: dataUpload['Sinopsis']
                });
                cont++;
            });
            firebase.auth().signOut();
            //showForecast();
        });

    }

    const showForecast = () => {

        if (localStorage.getItem('usuario') === null) {
            console.log('Entro******showForecast***');
            firebase.auth().signInWithEmailAndPassword(dataUserRoot.email, dataUserRoot.password).then(function (userLogin) {
                var currentDate = moment().format("YYYY-MM-DD");
                var currentTime = moment().format("HH:mm");
                //Buscar información del pronostico
                var ref = firebase.database().ref('pronostico/' + currentDate);
                ref.orderByChild("hora").limitToLast(1).on("child_added", function (snapshot) {
                    //console.log('Key', snapshot.key);
                    var forecastFound = firebase.database().ref('pronostico/' + currentDate + '/' + snapshot.key);
                    forecastFound.on("value", function (forecastValue) {
                        // Envia los valores de pronostico al state del Router
                        props.weatherForecast(forecastValue.val());
                    });
                });

                //Buscar información de alertas
                var ref = firebase.database().ref('alerta/' + currentDate);
                //console.log('Ref:',ref);
                ref.orderByChild("latitud").equalTo(4.649937).once("value", function (alertValue) {
                    //console.log('value', alertValue);
                    if (alertValue.val() !== null) {
                        //console.log('Valor alerta', alertValue.val());
                        props.weatherAlert(alertValue.val()[0]);
                    }
                });

                //Consultar todas las alertas
                ref.orderByChild("latitud").once("value", function (alertValue) {
                    props.weatherAlertAll(alertValue.val());
                });
                firebase.auth().signOut();
            });
        } else {
            var latitud = JSON.parse(localStorage.getItem('usuario')).latitud;
            var longitud = JSON.parse(localStorage.getItem('usuario')).longitud;
            console.log('Cargue por lat:', latitud);
            console.log('Cargue por lng:', longitud);
            firebase.auth().signInWithEmailAndPassword(dataUserRoot.email, dataUserRoot.password).then(function (userLogin) {
                var currentDate = moment().format("YYYY-MM-DD");
                var currentTime = moment().format("HH:mm");
                //Buscar información del pronostico
                var ref = firebase.database().ref('pronostico/' + currentDate);
                ref.orderByChild("latitud").equalTo(latitud).on("child_added", function (forecastValue) {
                    //console.log("Val:",forecastValue.val());                    
                    if (forecastValue.val() !== null) {
                        props.weatherForecast(forecastValue.val());
                    }
                });

                //Buscar información de alertas
                var ref = firebase.database().ref('alerta/' + currentDate);
                //console.log('Ref:',ref);
                ref.orderByChild("latitud").equalTo(latitud).on("child_added", function (alertValue) {
                    //console.log('Se encontro alerta para el usuario', alertValue);
                    if (alertValue.val() !== null) {
                        //console.log('Valor de la alerta Usuario', alertValue.val());
                        props.weatherAlert(alertValue.val());
                    }
                });

                firebase.auth().signOut();
            });
        }
    }
    return (
        <div>
        </div>
    );
}
export default AutomaticProcess;