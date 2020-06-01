import React,{Suspense} from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import firebaseConfig from './donclima-fb';
import { FirebaseAppProvider } from 'reactfire';


ReactDOM.render(
  <FirebaseAppProvider firebaseConfig = {firebaseConfig}>
    <Suspense fallback={"Cargando..."}>
      <App />
    </Suspense>
  </FirebaseAppProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
