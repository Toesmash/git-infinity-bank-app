import React from 'react';
import ReactDOM from 'react-dom';

import { firebase } from './firebase/firebase';
import { Provider } from 'react-redux';

import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';

import LoadingPage from './components/LoadingPage';
import { login, logout } from './actions/authActions';

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

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
   if (user) {
      console.log("USER UID:", user.uid);
      reduxStore.dispatch(login(user.uid));
      renderApp();
      if (history.location.pathname === '/login' || history.location.pathname === '/register') {
         history.push('/dashboard')
      };
   }
   else {
      reduxStore.dispatch(logout());
      renderApp();
   }
});

