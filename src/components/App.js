import React, { Component } from 'react';
import '../css/App.css';
import Footer from './Footer';
import Router from './Router';

class App extends React.Component{

  state={
    pronostico: {}
  }

  agregarPronostico=(pronostico)=>{
    this.setState({
      pronostico:pronostico
    })
  }

  render() {
    return (
      <div>
      
      
      <Router
        agregarPronostico={this.agregarPronostico}
        pronostico={this.state.pronostico}
      />
      
      
      <Footer/>
      
    </div>
    );
  }  
}
export default App;