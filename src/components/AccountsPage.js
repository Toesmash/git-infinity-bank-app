import React from 'react';
import { connect } from 'react-redux';

import AccountList from './AccountList';

const AccountsPage = () => {
   return (
      <div>
         <h1>Prehlad uctov</h1>
         <AccountList />
      </div>
   )
};

export default connect()(AccountsPage);
