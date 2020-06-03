import React from 'react';
import data from '../data.json';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './Header';
import SignUp from './SignUp';
import LogIn from './LogIn';
import Banner from './Banner';
import Home from './Home';

class Router extends React.Component{
    state={   
        login:false,
        user:[],
        clima:{}
    };

    componentDidMount() {
        const loginLS = localStorage.getItem('login');
        const userLS = localStorage.getItem('user');
        this.setState({
            clima: data,
            login: JSON.parse(loginLS),
            user: JSON.parse(userLS)
        });
        console.log(data);
        this.props.agregarPronostico(data[0]);
    };


    componentDidUpdate(){
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
    userLogin=(newLogin)=>{
        console.log('vengo del hijo', newLogin);
        
        this.setState({
        login:newLogin
        }); 
        console.log("sesion",this.state.login);
    };

    // Actualiza informacion del usuario logueado
    userSesion=(userIn)=>{
        console.log("se recive usuario",userIn);

        this.setState({
        user:userIn
        }); 
        console.log("state nuevo",this.state.user.nombre);
    }

    render() {
        return (
            <BrowserRouter>
            <Banner/>
            <Header
                login={this.state.login}
                userLogin={this.userLogin}
                user={this.state.user}
                //userSesion={this.userSesion}
            />
                <Switch>
                    <Route exact path="/" render={()=>(
                        <Home
                        pronostico={this.props.pronostico}
                      />
                    )}/>
                    <Route exact path="/signup" component={SignUp} />
                    <Route exact path="/login" render={()=>(
                        <LogIn
                            userLogin={this.userLogin}
                            userSesion={this.userSesion}
                        />
                    )}/>
                </Switch>
            </BrowserRouter>
        );
    }
}
export default Router;