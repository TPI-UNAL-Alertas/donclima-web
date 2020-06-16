import React from 'react';
import FormUser from './FormUser';
import person from '../img/logo/personaje01.png';
import MapAppUser from './MapAppUser';

class ModifyUser extends React.Component {

    state = {
        markerUser: []
    }

    markerUser = (newMarkerUser) => {
        this.setState({ markerUser: newMarkerUser })
    }

    render() {
        return (
            <div className="background-form home-page shadow-sm p-3 mb-5 bg-white rounded">
                <div className="row">
                    <div className="col-md-7">
                        <div className="shadow-sm p-3 mb-5 bg-white rounded shadow-form">
                            <div className="row justify-content-md-center">
                                <div className="col-md-2 media">
                                    <img className="logo-signup align-self-center mr-3" src={person} />
                                </div>
                                <div className="col-md-8 media-body">
                                    <h2>Modificar datos personales</h2>
                                </div>

                            </div>
                            <hr />
                            <FormUser
                                markerUser={this.state.markerUser}
                            />
                        </div>

                    </div>
                    <div className="col-md-5">
                        <div className="shadow-sm p-3 mb-5 bg-white rounded shadow-map">
                            <MapAppUser
                                markerUser={this.markerUser}
                            />
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}
export default ModifyUser;