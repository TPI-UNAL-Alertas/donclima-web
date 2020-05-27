import React from 'react';
import '../css/App.css';
import SignUp from './SignUp';
import Banner from './Banner';
import Home from './Home';
import Header from './Header';

function App() {
  return (
    <div >
      
      <Banner/>
      <Header/>
      <Home/>
      <SignUp/>
    </div>
  );
}

export default App;
