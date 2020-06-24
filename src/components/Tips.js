import React from 'react';
import { Link } from 'react-router-dom';
import img from '../img/title2.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLeaf, faWater, faSeedling, faFan, faSmog, faShower, faSun, faWind } from '@fortawesome/free-solid-svg-icons'

class Tips extends React.Component {
    render() {
        return (
            <div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={img} className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h1>Consejos para evitar daños</h1>
                            <p>Sigue estos consejos cuando sepas que va a ocurrir una helada. Si no sabes como enterarte
registrarte, de esta manera recibirás las alertas directamente en tu celular.</p>
                            <Link to="/signup"><button className="btn btn-outline-light my-2 my-sm-0 menu button-yellow-outline" type="submit">Registrate</button></Link>
                        </div>
                    </div>
                </div>

                <div className="shadow-sm p-3 mb-5 bg-white rounded home-page">
                    <div className="justify-content-md-center">
                        <h3 className="text-center"><strong>Mitigación de riesgos de heladas</strong></h3>
                        <p className="h6 text-center">Para minimizar el efecto de las heladas existen diversas técnicas cuyo éxito dependerá de su correcta aplicación y en el momento oportuno. No existe el método perfecto dado que en alguna situación su capacidad puede ser excedida frente a alguna helada en particular. Los métodos de control de heladas pueden ser clasificados en sistemas de control pasivos y sistemas de control activos. </p>
                        <hr />
                    </div>
                </div>
                <div className="shadow-sm p-3 mb-5 bg-white rounded home-page">

                    <div className="justify-content-md-center article-page">
                        <h4 className="text-center">Sistemas de control pasivos</h4>
                        <p className="text-center">Son aquellas prácticas más bien de tipo preventivo, que se establecen antes que ocurran las heladas. Van desde el análisis de la ubicación del predio, cultivo o especie, hasta manejos del suelo.</p>

                    </div>

                    <div className="card-group justify-content-md-center">
                        <div className="card">
                            <div className="circulo mx-auto">
                                <div className="text-center text-white"><h3 className="display-4"><FontAwesomeIcon icon={faWater} /></h3></div>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Mojamiento del suelo</h5>
                                <p className="card-text">El almacenamiento de calor en el suelo está muy relacionado con su contenido de agua. Un suelo con bajo contenido de humedad posee gran parte de sus poros ocupados con aire, elemento de baja capacidad calórica y que se enfría más rápidamente. Por lo tanto, previo a períodos de riesgos de heladas, es recomendable mantener el suelo con alta humedad.</p>
                                <p className="card-text"><small className="text-muted"></small></p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="circulo mx-auto">
                                <div className="text-center text-white"><h3 className="display-4"><FontAwesomeIcon icon={faLeaf} /></h3></div>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Eliminar la cobertura vegetal</h5>
                                <p className="card-text">La existencia de una cubierta vegetal en la entre hilera, presenta una menor capacidad de acumulación de calor, con un mayor efecto perjudicial de la helada. Cuando no es factible eliminar la cobertura vegetal, es recomendable mantenerla lo más corta posible.</p>
                                <p className="card-text"><small className="text-muted"></small></p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="circulo mx-auto">
                                <div className="text-center text-white"><h3 className="display-4"><FontAwesomeIcon icon={faSeedling} /></h3></div>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Uso de cubiertas sobre las plantas</h5>
                                <p className="card-text">Este sistema ha ganado popularidad. La atmósfera bajo las cubiertas mantiene algunos grados más de temperatura que el cielo abierto, porque reduce la pérdida de calor desde el suelo al aire.</p>
                                <p className="card-text"><small className="text-muted"></small></p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="circulo mx-auto">
                                <div className="text-center text-white"><h3 className="display-4"><FontAwesomeIcon icon={faWind} /></h3></div>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Uso de barreras al movimiento del aire</h5>
                                <p className="card-text">Dependiendo de la configuración del sitio, esta práctica puede ser importante. Para analizar la posibilidad de instalar o eliminar barreras, es necesario conocer previamente por dónde ocurre el paso del aire frío. Pueden existir situaciones que faciliten su paso hacia el cultivo, como son bajos, cauces de agua, donde es adecuada la instalación de barreras que desvíen el paso del aire.</p>
                                <p className="card-text"><small className="text-muted"></small></p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="shadow-sm p-3 mb-5 bg-white rounded home-page">

                    <div className="justify-content-md-center article-page">
                        <h4 className="text-center">Sistemas de control activos</h4>
                        <p className="text-center">Este tipo de control tiene por objetivo aportar calor para evitar que la temperatura caiga bajo el umbral de daño a los tejidos u órganos presentes en las plantas.</p>

                    </div>

                    <div className="card-group justify-content-md-center">
                        <div className="card">
                            <div className="circulo mx-auto">
                                <div className="text-center text-white"><h3 className="display-4"><FontAwesomeIcon icon={faShower} /></h3></div>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Riego por aspersión elevado</h5>
                                <p className="card-text">Es uno de los métodos que mejores resultados ha logrado y es capaz de controlar heladas que ocurren por masas de aire frío. Se basa en la capacidad del agua de entregar calor cuando se enfría. Una vez aplicada el agua sobre el follaje y mientras se enfría, libera calor hacia los tejidos de las plantas y al ambiente inmediato, protegiendo así a los tejidos. El follaje debe mojarse mientras dure la helada.</p>
                                <p className="card-text"><small className="text-muted"></small></p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="circulo mx-auto">
                                <div className="text-center text-white"><h3 className="display-4"><FontAwesomeIcon icon={faSun} /></h3></div>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Calefactores</h5>
                                <p className="card-text">Este método se basa en entregar mayor temperatura al aire, bajo el concepto que, si se agrega suficiente calor para nivelar la pérdida de energía, entonces la temperatura del aire no caerá a niveles de causar daño. Los equipos más comunes son aquellos que calientan el aire con fuego abierto ya sea por quemadores o sistemas similares. </p>
                                <p className="card-text"><small className="text-muted"></small></p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="circulo mx-auto">
                                <div className="text-center text-white"><h3 className="display-4"><FontAwesomeIcon icon={faFan} /></h3></div>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Torres de ventilación</h5>
                                <p className="card-text">Se basan en impulsar masas de aire para mezclar el aire caliente que ha subido desde el suelo, con el aire frío cercano a los árboles. La altura de trabajo debe considerar qué tan alta ocurre la capa de inversión térmica. No se recomienda su uso en zonas ventosas o en caso de heladas extremas pues los equipos se pueden dañar si se forma hielo en las aspas.</p>
                                <p className="card-text"><small className="text-muted"></small></p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="circulo mx-auto">
                                <div className="text-center text-white"><h3 className="display-4"><FontAwesomeIcon icon={faSmog} /></h3></div>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Aplicación de humo</h5>
                                <p className="card-text">Diversas investigaciones han demostrado que su efecto real es prácticamente nulo, siendo no recomendable además porque atenta contra el medio ambiente, generando contaminación y puede causar accidentes por disminución de la visibilidad. Por otra parte, a la salida del sol el humo impide el paso del calor hacia el suelo, prolongando aún por mayor tiempo la duración o efecto de la helada.</p>
                                <p className="card-text"><small className="text-muted"></small></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
export default Tips;