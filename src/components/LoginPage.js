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

   // export const LoginPage = (props) => (
   //    <div className='box-layout'>
   //       <div className='box-layout__box'>
   //          <h1 className='box-layout__title'>Expensify App</h1>
   //          <p>It's time to get your expenses under control.</p>
   //          <button className='button' onClick={props.startLogin}>Login with Google</button>
   //       </div>
   //    </div>
   // );



   return (
      <div className='box-layout'>
         <div className='box-layout__box'>
            <form onSubmit={handleSignIn}>
               <h3>Vitajte v INFINITYbank</h3>
               <input
                  autoFocus
                  type="text"
                  placeholder="Zadajte identifikacne cislo"
               />
               <input type="password" placeholder="Zadajte heslo" />
               <input type="number" placeholder="Zadajte overovaci PIN" />
               <button className='button'>Prihláste sa</button>
            </form>
         </div>
      </div>

   );



};

const mapDispatchToProps = (dispatch) => ({
   startLogin: (email, password) => dispatch(startLogin(email, password))
});

export default connect(undefined, mapDispatchToProps)(LoginPage);