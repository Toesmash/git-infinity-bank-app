import React from 'react';
import { connect } from 'react-redux';
import { startLogout } from '../actions/authActions';

const Header = (props) => {
   return (
      <header className='header'>
         <div className='content-container'>
            <div className='header__content'>
               <h1 className='header__title'>INFINITY<span>bank</span></h1>
               <button className='button button--link' onClick={props.startLogout}>Logout</button>
            </div>
         </div>
      </header>
   );
};

const mapDispatchToProps = (dispatch) => ({
   startLogout: () => dispatch(startLogout()),
});

export default connect(undefined, mapDispatchToProps)(Header);