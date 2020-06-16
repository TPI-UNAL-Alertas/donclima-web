import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTemperatureLow, faCloud, faWind, faUmbrella, faCloudSunRain, faBell } from '@fortawesome/free-solid-svg-icons'
import MapApp from './MapAppForecast';

//const Weather = props => {
class Weather extends React.Component {

    forecast = this.props.forecast;
    alert = this.props.alert;
    alertAll = this.props.alertAll;

    componentDidMount() {
        if (localStorage.getItem('usuario') !== null) {
            this.forecast = JSON.parse(localStorage.getItem('pronosticoUser'));
            this.alert = JSON.parse(localStorage.getItem('alertaUser'));
        }
        /* else {
            console.log("No esta el usuario:",this.forecast);    
            this.forecast = this.props.forecast;
            this.alert = this.props.alert;
        }*/
    }
    render() {
        return (

            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div id="map" className="shadow-sm p-3 mb-5 bg-white rounded shadow-map-home">
                            <MapApp></MapApp>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="shadow-sm p-3 mb-5 bg-white rounded ">
                            <h2>Pronostico <em>{this.props.forecast.pronostico}{this.forecast.pronostico}</em></h2>
        <div><h5><FontAwesomeIcon icon={faTemperatureLow} /> Temperatura: {this.props.forecast.temperatura}{this.forecast.temperatura}</h5></div>
                            <div><h5><FontAwesomeIcon icon={faCloud} /> Nubosidad: {this.props.forecast.cobertura_total_nubosa}{this.forecast.cobertura_total_nubosa}</h5></div>
                            <div><h5><FontAwesomeIcon icon={faUmbrella} /> Precipitación: {this.props.forecast.precipitacion}{this.forecast.precipitacion}</h5></div>
                            <div><h5><FontAwesomeIcon icon={faWind} /> Vientos: {this.props.forecast.velocidad_viento}{this.forecast.velocidad_viento} </h5></div>
                            <div><h5><FontAwesomeIcon icon={faCloudSunRain} /> Humedad: {this.props.forecast.humedad}{this.forecast.humedad}</h5></div>
                            <div className="text-danger"><h5><FontAwesomeIcon icon={faBell} /> Alertas:</h5></div>
                            <div className="text-danger"><h5 className="text-justify"> {this.props.alert.sinopsis}{this.alert.sinopsis}</h5></div>
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Weather;
