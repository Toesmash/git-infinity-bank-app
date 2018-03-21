import React from 'react';
import { connect } from 'react-redux';

import AccountList from './AccountList';
import AccountTransactions from './AccountTransactions';
import AccountTransactionFilter from './AccountTransactionFilter';

const AccountsPage = () => {
   return (
      <div>
         <div className='page-header'>
            <div className='content-container'>
               <h1 className='page-header__title'>Prehľad účtov</h1>
            </div>
         </div>
         <div className='content-container'>
            <AccountList />
            <AccountTransactionFilter />
            <AccountTransactions />
         </div>
      </div>
   )
};

export default connect()(AccountsPage);
