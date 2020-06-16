import React from 'react';
import data from '../data.json';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './Header';
import SignUp from './SignUp';
import LogIn from './LogIn';
import Banner from './Banner';
import Home from './Home';
import ModifyUser from './ModifyUser';
import DonClima from './DonClima';
import { markersAlert, iconBlue } from './ConstMap';

class Router extends React.Component {
    state = {
        login: false,
        user: [],
        clima: {},
        forecast: [],
        alert: [],
        alertAll: []
    };

    componentDidMount() {
        if (localStorage.getItem('user') !== null) {
            const loginLS = localStorage.getItem('login');
            const userLS = localStorage.getItem('user');
            this.setState({
                clima: data,
                login: JSON.parse(loginLS),
                user: JSON.parse(userLS)
            });
        }
        //this.props.weatherForecast;
        this.props.agregarPronostico(data[0]);
        
    };


    componentDidUpdate() {
        localStorage.setItem(
            'login',
            JSON.stringify(this.state.login)
        );
        localStorage.setItem(
            'user',
            JSON.stringify(this.state.user)
        );
    }

    // Actualiza el estado de la sesion en el state
    userLogin = (newLogin) => {
        console.log('vengo del hijo', newLogin);

        this.setState({
            login: newLogin
        });
        console.log("sesion", this.state.login);
    };

    // Actualiza informacion del usuario logueado
    userSesion = (userIn) => {
        //console.log("se recive usuario",userIn);

        this.setState({
            user: userIn
        });
        //console.log("state nuevo",this.state.user.nombre);
        //this.forescast();
    }

    // Actualiza informacion del pronostico por usuario logueado
    weatherForecast = (newForecast) => {
        console.log('Route:Se esta guardando el dato:', newForecast);
        this.setState({forecast: newForecast});
    }

    weatherAlert = (newAlert) => {
        this.setState({alert: newAlert});
    }

    weatherAlertAll = (newAlertAll) => {
        this.setState({alertAll: newAlertAll});
    }

    render() {
        return (
            <BrowserRouter>
                <Banner />
                <Header
                    login={this.state.login}
                    userLogin={this.userLogin}
                    user={this.state.user}
                    weatherForecast={this.weatherForecast}
                    weatherAlert={this.weatherAlert}
                    weatherAlertAll={this.weatherAlertAll}
                //userSesion={this.userSesion}
                />
                <Switch>
                    <Route exact path="/donclima" component={DonClima} />
                    <Route exact path="/" render={()=>(
                        <Home
                            pronostico={this.props.pronostico}
                            forecast={this.state.forecast}
                            alert={this.state.alert}
                            alertAll={this.state.alertAll}
                        />
                    )} />
                    <Route exact path="/signup" component={SignUp} />
                    <Route exact path="/login" render={() => (
                        <LogIn
                            userLogin={this.userLogin}
                            userSesion={this.userSesion}
                        />
                    )} />
                    <Route exact path="/modifyuser" component={ModifyUser} />
                </Switch>
            </BrowserRouter>
        );
    }
}
export default Router;