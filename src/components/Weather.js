import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTemperatureLow, faCloud, faWind, faUmbrella, faCloudSunRain, faBell } from '@fortawesome/free-solid-svg-icons'

class Weather extends React.Component{
    
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-6">
                        <div className="shadow-sm p-3 mb-5 bg-white rounded ">
                            <h2>Pronostico</h2>
                            <div><h5><FontAwesomeIcon icon={faTemperatureLow}/> Temperatura: </h5></div>
                            <div><h5><FontAwesomeIcon icon={faCloud}/> Nubosidad: </h5></div>
                            <div><h5><FontAwesomeIcon icon={faUmbrella}/> Precipitación: </h5></div>
                            <div><h5><FontAwesomeIcon icon={faWind}/> Vientos: </h5></div>
                            <div><h5><FontAwesomeIcon icon={faCloudSunRain}/> Humedad: </h5></div>
                            <div><h5><FontAwesomeIcon icon={faBell}/> Alertas: </h5></div>
                            <p></p>      
                        </div>

                    </div>
                </div>
                
                
            </div>
        );
    }
}
export default Weather;