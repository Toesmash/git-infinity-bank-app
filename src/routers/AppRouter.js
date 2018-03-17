// 3rd party
import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
// Components
import AccountsPage from '../components/AccountsPage';
import CardsPage from '../components/CardsPage';
import DashboardPage from '../components/DashboardPage';
import LoginPage from '../components/LoginPage';
import NotFoundPage from '../components/NotFoundPage';
import PaymentsPage from '../components/PaymentsPage';
import RegisterPage from '../components/RegisterPage';
// Routes
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

export const history = createHistory();

const AppRouter = () => (
   <Router history={history}>
      <div>
         <Switch>
            <PublicRoute path='/login' component={LoginPage} />
            <PublicRoute path='/register' component={RegisterPage} exact={true} />
            <PrivateRoute path='/dashboard' component={DashboardPage} />
            <PrivateRoute path='/payments' component={PaymentsPage} />
            <PrivateRoute path='/accounts' component={AccountsPage} />
            <PrivateRoute path='/cards' component={CardsPage} />
            <Route component={NotFoundPage} />
         </Switch>
      </div>
   </Router>
);

export default AppRouter;