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
        clima:{}
    };

    componentDidMount() {
        this.setState({
            clima: data
        })
        console.log(data);
        this.props.agregarPronostico(data[0]);
    };

    render() {
        return (
            <BrowserRouter>
            <Banner/>
            <Header/>
                <Switch>
                    <Route exact path="/" render={()=>(
                        <Home
                        pronostico={this.props.pronostico}
                      />
                    )}/>
                    <Route exact path="/signup" component={SignUp} />
                    <Route exact path="/login" component={LogIn} />
                </Switch>
            </BrowserRouter>
        );
    }
}
export default Router;