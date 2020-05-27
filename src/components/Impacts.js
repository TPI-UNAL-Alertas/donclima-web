import React from 'react';
import img from '../img/title1.png';

class Impacts extends React.Component{
    render() {
        return (                
            <div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                    <img src={img} className="d-block w-100" alt="..."/>
                    <div className="carousel-caption d-none d-md-block">
                        <h1>Impactos por Heladas</h1>
                        <p>Para prevenir a tiempo los daños causados por las heladas en tus cultivos te invitamos a
registrarte y de esta manera recibirás las alertas directamente en tu celular.</p>
                        <button className="btn btn-outline-warning my-2 my-sm-0 menu" type="submit">Registrate</button>
                    </div>
                    </div>                    
                </div>  
                <p>falta agregar contenido</p>
            </div>
                             
        );
    }
}
export default Impacts;