import React from 'react';
import img from '../img/title2.png';

class Tips extends React.Component{
    render() {
        return (                
            <div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                    <img src={img} className="d-block w-100" alt="..."/>
                    <div className="carousel-caption d-none d-md-block">
                        <h1>Consejos para evitar daños</h1>
                        <p>Sigue estos consejos cuando sepas que va a ocurrir una helada. Si no sabes como enterarte
registrarte, de esta manera recibirás las alertas directamente en tu celular.</p>
                        <button className="btn btn-outline-success my-2 my-sm-0 menu" type="submit">Registrate</button>
                    </div>
                    </div>                    
                </div>  
                <p>falta agregar contenido</p>
            </div>
                             
        );
    }
}
export default Tips;