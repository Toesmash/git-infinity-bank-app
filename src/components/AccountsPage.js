import React from 'react';
import { connect } from 'react-redux';

import AccountList from './AccountList';
import AccountTransactions from './AccountTransactions';
import AccountFilter from './AccountFilter';

const AccountsPage = () => {
   return (
      <div>
         <h1>Prehlad uctov</h1>
         <AccountList />
         <AccountFilter />
         <AccountTransactions />
      </div>
   )
};

export default connect()(AccountsPage);
