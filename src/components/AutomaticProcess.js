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

    //Cron para cargar el pronostico de día.
    var cron = require('node-cron');
    cron.schedule('00 04 * * *', () => {
        console.log('Se ejecuta a las 4 de la mañana');
        loadForecast();
    });

    //Método para cargar el pronostico y alertas del día.
    const loadForecast = async () => {
        firebase.auth().signInWithEmailAndPassword(dataUserRoot.email, dataUserRoot.password).then(function (userLogin) {
            var cont = 0;
            var currentDate = moment().format("YYYY-MM-DD");

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
                    presion: forecastDay['Presion'],
                    probabilidad_tormenta: forecastDay['Probabilidad de Tormenta'],
                    pronostico: forecastDay['Pronostico'],
                    punto_rocio: forecastDay['Punto de Rocio'],
                    region: forecastDay['Region'],
                    temperatura: forecastDay['Temperatura'],
                    velocidad_viento: forecastDay['Velocidad del Viento'],
                    departamento_municipio: forecastDay['Departamento'] + '-' + forecastDay['Municipio']
                });
                cont++;
            });

            //Cargar alertas
            cont = 0;
            alertData.map(dataUpload => {
                firebase.database().ref('alerta/' + currentDate + '/' + cont).set({
                    cod_div: dataUpload['Cod_Div'],
                    latitud: dataUpload['Latitud'],
                    longitud: dataUpload['Longitud'],
                    fenomeno: dataUpload['Fenomeno'],
                    nivel: dataUpload['Nivel'],
                    municipio: dataUpload['Municipio'],
                    departamento: dataUpload['Departamento'],
                    region: dataUpload['Region'],
                    fecha: currentDate,
                    hora: dataUpload['Hora'],
                    sinopsis: dataUpload['Sinopsis'],
                    departamento_municipio: dataUpload['Departamento'] + '-' + dataUpload['Municipio']
                });
                cont++;
            });

            //Luego de cargas el pronostico y alertas se deben asociar a cada usuario
            associateForecastUser();
        });

    }

    //Método para asociar cada usuario al pronostico y si aplica a la alerta.
    const associateForecastUser = async () => {
        var latitudS, longitudS, ref;
        var currentDate = moment().format("YYYY-MM-DD");

        //Buscar información del pronostico
        firebase.database().ref('usuarios').on("child_added", function (userData) {
            if (userData.val() !== null) {

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
            }
        });

        //Buscar información de alertas
        firebase.database().ref('usuarios').on("child_added", function (userData) {

            if (userData.val() !== null) {

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
        });

        firebase.auth().signOut();
    }

    return (
        <div>
        </div>
    );
}
export default AutomaticProcess;