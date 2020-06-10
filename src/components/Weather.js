import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTemperatureLow, faCloud, faWind, faUmbrella, faCloudSunRain, faBell } from '@fortawesome/free-solid-svg-icons'
import "firebase/auth";
import "firebase/database";
import { useFirebaseApp, useUser } from 'reactfire';
import data from '../data.json';
import moment from 'moment';


const Weather = props =>{
//class Weather extends React.Component{
    
    //render() {
        const firebase = useFirebaseApp();
        const forecastValue = props.forecast;

        //Cron para cargar el pronostico de día.
        const forescast= async (e)=>{
            var cron = require('node-cron');
            cron.schedule('* 6 * * *', () => {
                console.log('running a task every minute');
                loadForecast();
            });
        }
        
        const loadForecast= async (e)=>{
            e.preventDefault();
            //console.log('pronostico',pronostico);
            //console.log('data',data);
            //console.log('data 0',data[0]);
            var cont = 0;
            data.map(forecastDay => {
                firebase.database().ref('pronostico/'+forecastDay['Fecha']+'/'+cont).set({
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
                        probabilidad_tormenta:forecastDay['Probabilidad de Tormenta'],
                        pronostico: forecastDay['Pronostico'],
                        punto_rocio: forecastDay['Punto de Rocio'],
                        region: forecastDay['Region'],
                        temperatura: forecastDay['Temperatura'],
                        velocidad_viento: forecastDay['Velocidad del Viento']
                });
                cont++;
            });
        }

        const showForecast= async (e)=>{

            var currentDate = moment().format("YYYY-MM-DD");
            var currentTime = moment().format("hh:mm");
            console.log('fecha',currentDate);
            console.log('Hora',currentTime);
            
            //var duration = moment.duration(end.diff(startTime));
            //var minutes = duration.minutes(); 
            
            //Buscar información del pronostico
            var ref = firebase.database().ref('pronostico/'+currentDate);
            ref.orderByChild("hora").on("child_added",function(snapshot){
            //ref.orderByChild("hora").equalTo(currentTime).on("child_added",function(snapshot){
                console.log('Key', snapshot.key);
                
                //console.log('Key', snapshot.key);
                // Coleccion 'usuarios' en firebase
                var forecastFound = firebase.database().ref('pronostico/'+currentDate+'/'+snapshot.key);
                //console.log('Usuario:',usuarioLogueado);
                forecastFound.on("value", function(forecastValue){
                    //console.log("Valor logueado", valorLogueado.val());
                    // Envia el objeto de los datos del usuario al state del Router
                    //props.userSesion(forecastValue.val());
                    //forecastValueG = forecastValue.val();

                    // Envia los valores de pronostico al state del Router
                    props.weatherForecast(forecastValue.val());
                    //forecastValueG = forecastValue.val(); //Mirar
                    
                    console.log("Valor logueado", forecastValue.val());
                    console.log("Valor logueado nuebes", forecastValue.val().humedad);
                    //console.log("Valor logueado", valorLogueado.val().documento);

                });
            
            });
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4232.736297530871!2d-74.08628757260196!3d4.638238035547643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9bd14943c13b%3A0x3de530667d9ff6b0!2sUniversidad%20Nacional%20de%20Colombia!5e0!3m2!1ses-419!2sco!4v1591638548281!5m2!1ses-419!2sco" width="500" height="300" frameborder="0"  allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                    </div>
                    <div className="col-md-6">
                        <div className="shadow-sm p-3 mb-5 bg-white rounded ">
                            <h2>Pronostico <em>{forecastValue.pronostico}</em></h2>
                            <div><h5><FontAwesomeIcon icon={faTemperatureLow}/> Temperatura: {forecastValue.temperatura}</h5></div>
                            <div><h5><FontAwesomeIcon icon={faCloud}/> Nubosidad: {forecastValue.cobertura_total_nubosa}</h5></div>
                            <div><h5><FontAwesomeIcon icon={faUmbrella}/> Precipitación: {forecastValue.precipitacion}</h5></div>
                            <div><h5><FontAwesomeIcon icon={faWind}/> Vientos: {forecastValue.velocidad_viento} </h5></div>
                            <div><h5><FontAwesomeIcon icon={faCloudSunRain}/> Humedad: {forecastValue.humedad}</h5></div>
                            <div><h5><FontAwesomeIcon icon={faBell}/> Alertas: </h5></div>
                            <p></p>      
                        </div>
                        <button className="btn btn-warning btn-form" type="submit" onClick={loadForecast}>Cargar informacion</button>
                        <button className="btn btn-warning btn-form" type="submit" onClick={showForecast}>Mostrar pronostico</button>
                        
                    </div>
                </div>
                
                
            </div>
        );
    //}
}
export default Weather;
