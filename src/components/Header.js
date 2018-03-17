import React from 'react';
import { connect } from 'react-redux';
import { startLogout } from '../actions/authActions';

const Header = (props) => {
   return (
      <div>
         <button onClick={props.startLogout}>Logout</button>
      </div>
   );
};

const mapDispatchToProps = (dispatch) => ({
   startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);