import React from 'react';
import Weather from './Weather';
import Impacts from './Impacts';
import Tips from './Tips';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf,faSnowflake,faClipboardCheck} from '@fortawesome/free-solid-svg-icons'


class Home extends React.Component{
    render() {
        return (
            <div>
                <div>
                    <div>
                        <h4 id="clima"></h4>
                        <Weather
                            pronostico={this.props.pronostico}
                        />
                    </div>
                    <div className="row justify-content-md-center">
                        <div className="card text-white bg-info mb-3" >
                            
                            <div className="card-header"><FontAwesomeIcon icon={faFilePdf} /> PDF</div>
                            <div className="card-body">
                                <h5 className="card-title">Boletín IDEAM</h5>
                                <p className="card-text">Descargue el boletín completo expedido por el  IDEAM, haciendo click aquí.</p>
                            </div>
                        </div>
                        
                        <div className="card text-white bg-warning mb-3">
                            <div className="card-header"><FontAwesomeIcon icon={faSnowflake} /> Heladas</div>
                            <div className="card-body">
                                <h5 className="card-title">Afectaciones causadas por las Heladas</h5>
                                <p className="card-text">Como impacta la llegada de las heladas a la población campesina.</p>
                            </div>
                        </div>
                        <div className="card text-white bg-success mb-3">
                            <div className="card-header"><FontAwesomeIcon icon={faClipboardCheck} /> Tips</div>
                            <div className="card-body">
                                <h5 className="card-title">Consejos para prevenir los daños</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                        </div>

                    </div>
                    <div>
                        <h4 id="impactos"></h4>
                        <Impacts/>
                    </div>
                    <div>
                        <h4 id="consejos"></h4>
                        <Tips/>
                    </div>                    
                
                </div>                                
            </div>
        );
    }
}
export default Home;