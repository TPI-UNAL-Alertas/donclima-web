import React, { Component } from 'react';
import logo from '../img/logo/personaje.png';

class DonClima extends Component {

    render() {
        return (
            <div>
                <div className="home-page shadow-sm p-3 mb-5 bg-white rounded">
                    <div className="row don-clima">
                        <div className="col-md-7 text-justify">
                            <h1>Don Clima</h1>
                            <p><strong><em>Don Clima</em></strong> es un canal de comunicación que obtiene información y pronósticos de entidades como el IDEAM y la CAR e informa a los agricultores por medio de una plataforma web intuitiva, mensajería de texto o emisoras radiales sobre la posible ocurrencia de heladas.</p>
                            <p>Esta solución nace de la necesidad de ofrecer canales comunicación para transmitir la información relacionada con las heladas, ofreciendo un sistema de alerta temprana y de alguna manera mitigar este problema. </p>
                            <p>Somos estudiantes de ingeniería agrícola, ingeniería de sistemas y diseño industrial, de la <em>Universidad Nacional de Colombia – Sede Bogotá</em>, comprometidos para que los agricultores puedan ser alertados y puedan actuar y tomar medidas de prevención para mitigar la urgente pérdida de alimentos.</p>

                        </div>
                        <div className="col-md-5">
                            <div>
                                <img className="logo-don" src={logo} />
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        );
    }
}

export default DonClima;