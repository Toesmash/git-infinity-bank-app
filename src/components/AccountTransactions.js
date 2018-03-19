import React from 'react';
import { connect } from 'react-redux';
import { history } from '../routers/AppRouter';
import getAccountTransactions from '../selectors/accountTransactions';
import AccountTransactionItem from './AccountTransactionItem';

const AccountTransactions = (props) => {
   return (
      <div>
         <h1>--------------------------------------</h1>
         {
            props.transactions.map((item) => (
               <AccountTransactionItem key={item.id} {...item} />
            ))
         }
      </div>
   )
};

const mapStateToProp = (reduxState) => {
   let iban = ((history.location.pathname).split('/').splice(-1)[0]);
   if (iban == 'accounts') {
      iban = reduxState.accounts[0].iban;
      // iban = Object.keys(reduxState.transactions[0]);
   }
   return {
      transactions: getAccountTransactions(reduxState.transactions[iban])
   }
}



export default connect(mapStateToProp)(AccountTransactions);
// export default AccountTransactions;