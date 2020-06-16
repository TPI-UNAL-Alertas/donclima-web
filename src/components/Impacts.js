import React from 'react';
import {Link} from 'react-router-dom';
import img from '../img/title1.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIcicles, faCarrot} from '@fortawesome/free-solid-svg-icons'


class Impacts extends React.Component{
    render() {
        return (                
            <div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                    <img src={img} className="d-block w-100" alt="..."/>
                    <div className="carousel-caption d-none d-md-block">
                        <h1>Impactos por Heladas</h1>
                        <p>Para prevenir a tiempo los daños causados por las heladas en tus cultivos te invitamos a registrarte y de esta manera recibirás las alertas directamente en tu celular.</p>
                        <Link to="/signup"><button className="btn btn-outline-light my-2 my-sm-0 menu button-blue-outline" type="submit">Registrate</button></Link>
                    </div>
                    </div>                    
                </div>  
                <div className="shadow-sm p-3 mb-5 bg-white rounded home-page">
                    <div className="justify-content-md-center">
                        <h3 className="text-center"><strong>Condiciones en las que se producen las Heladas</strong></h3>
                        <p className="h6 text-center">Las heladas son eventos climáticos de gran preocupación en la actividad agrícola debido al potencial de pérdidas socio-económicas que generan. Se considera helada cuando se registre temperaturas bajo los cero grados Celsius, ocasionando daño en el cultivo.</p>
                        <hr/>
                    </div>
                </div>

                <div className="shadow-sm p-3 mb-5 bg-white rounded home-page">
                    
                    <div className="justify-content-md-center article-page">
                        <p className="text-center">El nivel de daño que sufra el cultivo dependerá de factores variados tales como la vulnerabilidad de la especie o variedad a bajas temperaturas, estado fenológico, intensidad de la helada, tiempo de exposición, ubicación geográfica, entre otros.</p>
                        
                    </div> 

                    <div className="row justify-content-md-center">
                    
                        <div className="card mb-3 card-impactos col-md-10">
                            <div className="row ">
                                <div className="col-md-4">
                                <div className="circulo-azul mx-auto">
                                    <div className="text-center text-white"><h3 className="display-4"><FontAwesomeIcon icon={faCarrot} /></h3></div> 
                                </div>
                                </div>
                                <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">Efectos de las heladas sobre los cultivos</h5>
                                    <p className="card-text">El efecto de la helada sobre el cultivo dependerá, entre otros factores, de la especie y del estado de desarrollo en que se encuentre, siendo más sensibles las etapas desde botón floral hasta fruto pequeño. Por lo mismo es necesario considerar en forma muy cuidadosa la ubicación geográfica de las variedades más tempranas, donde los árboles o parras florecen antes, quedando así más susceptibles a una helada. También son importantes las condiciones propias del predio, donde se presenten distintas temperaturas mínimas en diferentes sitios, con menores temperaturas en los bajos y en las partes inferiores de laderas.</p>
                                    <p className="card-text"><small className="text-muted"></small></p>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="card mb-3 card-impactos col-md-10">
                            <div className="row ">
                                <div className="col-md-4">
                                <div className="circulo-azul mx-auto">
                                    <div className="text-center text-white"><h3 className="display-4"><FontAwesomeIcon icon={faIcicles} /></h3></div> 
                                </div>
                                </div>
                                <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">¿Por qué se produce daño en las plantas?¿Por qué se produce daño en las plantas?</h5>
                                    <p className="card-text">El daño por helada no se debe a la formación de hielo en el exterior de la planta. El daño se produce por cambios en el agua existente en los espacios intercelulares de los tejidos de la planta. En una helada ocurre formación de hielo en esos espacios, el cual extrae agua de las células, deshidratándolas o bien forma cristales internos que las rompen. Se llama temperatura crítica, a aquélla que comienza a generar determinados niveles de daño, lo cual depende de factores tales como el estado de desarrollo de los tejidos, especie, variedad, edad de la planta, ubicación en el predio y tiempo de exposición a la condición de helada. </p>
                                    <p className="card-text"><small className="text-muted"></small></p>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
                             
        );
    }
}
export default Impacts;