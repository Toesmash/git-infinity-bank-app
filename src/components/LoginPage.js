import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { startLogin } from '../actions/authActions';

const LoginPage = (props) => {

   const handleSignIn = (e) => {
      e.preventDefault()
      const user = e.target[0].value;
      const password = e.target[1].value;
      const email = user + '@infinity.com'
      props.startLogin(email, password);
   }

   return (
      <div>
         <form onSubmit={handleSignIn}>
            <h3>Sign in</h3>
            <input
               autoFocus
               type="text"
               placeholder="Enter your identification number"
            />
            <input type="password" placeholder="enter password" />
            <input type="submit" value="Login" />
         </form>
      </div>
   );



};

const mapDispatchToProps = (dispatch) => ({
   startLogin: (email, password) => dispatch(startLogin(email, password))
});

export default connect(undefined, mapDispatchToProps)(LoginPage);