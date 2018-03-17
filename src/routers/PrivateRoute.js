import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import Header from '../components/Header';

const PrivateRoute = ({
   isAuthenticated,
   component: Component,
   ...rest
}) => {
   return (

      <Route
         {...rest}
         component={(props) => (
            isAuthenticated ? <div><Header /><Component {...props} /></div> : <Redirect to='/login' />
         )}
      />
   )

}


const mapStateToProps = (reduxStore) => ({
   isAuthenticated: !!reduxStore.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);