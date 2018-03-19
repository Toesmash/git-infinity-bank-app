import React from 'react';
import ReactDOM from 'react-dom';

import database, { firebase } from './firebase/firebase';
import { Provider } from 'react-redux';

import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';

import LoadingPage from './components/LoadingPage';
import { login, logout } from './actions/authActions';
import { startSetData } from './actions/fetchActions';

// STYLES
import 'react-dates/lib/css/_datepicker.css';
import 'normalize.css/normalize.css';
import './styles/styles.scss';



const reduxStore = configureStore();
let hasRendered = false;
const app = (
   <Provider store={reduxStore}>
      <AppRouter />
   </Provider>
);

const renderApp = () => {
   if (!hasRendered) {
      ReactDOM.render(app, document.getElementById('app'));
      hasRendered = true;
   }
};

// database.ref('/users').child('cNLeFEmvRTaG3L6FfNRsjivsQAY2').set({
//    name: 'Hanka',
//    surname: 'Feriancova',
//    accounts: {
//       SKAAAAAAAAAAAAAAAAAAAAAA: true
//    }
// })


// database.ref('/accounts').set({
//    iban: 'SK6554721520884974556992'
// }).then(() => {
//    console.log('Data is saved');
// }).catch((error) => {
//    console.log('This failed', error);
// });


ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
   if (user) {
      reduxStore.dispatch(login(user.uid));
      reduxStore.dispatch(startSetData()).then(()=>{
         renderApp();
      });
   }
   else {
      reduxStore.dispatch(logout());
      renderApp();
   }
});




// reduxStore.dispatch(startSetAccounts()).then(()=>{
//    renderApp();

//    if (history.location.pathname === '/login' || history.location.pathname === '/register') {
//       history.push('/dashboard')
//    };
// });

