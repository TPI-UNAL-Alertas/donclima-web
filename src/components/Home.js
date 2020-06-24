import React from 'react';
import Weather from './Weather';
import Impacts from './Impacts';
import Tips from './Tips';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf, faSnowflake, faClipboardCheck, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import AutomaticProcess from './AutomaticProcess';

class Home extends React.Component {

    state = {
        forecast: [],
        alert: [],
        alertAll: []

    }

    render() {
        return (
            <div>
                <div>
                    <span className="ir-arriba"><FontAwesomeIcon icon={faChevronUp} /></span>
                    <div className="home-page shadow-sm p-3 mb-5 bg-white rounded">
                        <h4 id="clima"></h4>
                        <AutomaticProcess />
                        <Weather
                            forecast={this.props.forecast}
                            alert={this.props.alert}
                            alertAll={this.props.alertAll}
                        />
                    </div>
                    <div className="row justify-content-md-center home-page shadow-sm p-3 mb-5 bg-white rounded">
                        <div className="card text-white card-ideam mb-3" >

                            <div className="card-header"><h4 className="text-center"><FontAwesomeIcon icon={faFilePdf} /> PDF</h4></div>
                            <div className="card-body">
                                <h5 className="card-title">Boletín IDEAM</h5>
                                <p className="card-text">Descargue el boletín completo expedido por el  IDEAM, haciendo click <a href="http://www.pronosticosyalertas.gov.co/boletines-e-informes-tecnicos" className="card-link text-white" target="_blank"><strong className="h5"><em>aquí</em></strong></a>.</p>
                            </div>
                        </div>

                        <div className="card text-white card-heladas mb-3">
                            <div className="card-header"><h4 className="text-center"><FontAwesomeIcon icon={faSnowflake} /> Heladas</h4></div>
                            <div className="card-body">
                                <h5 className="card-title">Afectaciones causadas por las Heladas</h5>
                                <p className="card-text">Cómo impacta la llegada de las heladas a la población campesina.</p>
                                <p className="text-center"><a href="#impactos" className="card-link text-white scroll"><strong className="h5"><em>click aquí</em></strong></a></p>
                            </div>
                        </div>
                        <div className="card text-white card-tips mb-3">
                            <div className="card-header"><h4 className="text-center"><FontAwesomeIcon icon={faClipboardCheck} /> Tips</h4></div>
                            <div className="card-body">
                                <h5 className="card-title">Consejos para prevenir los daños</h5>
                                <p className="card-text">Algunos tips para mitigar los daños causados por las heladas.</p>
                                <p className="text-center"><a href="#consejos" className="card-link text-white"><strong className="h5"><em>click aquí</em></strong></a></p>
                            </div>
                        </div>

                    </div>
                    <div>
                        <h4 id="impactos"></h4>
                        <Impacts />
                    </div>
                    <div>
                        <h4 id="consejos"></h4>
                        <Tips />
                    </div>

                </div>
            </div>
        );
    }
}
export default Home;