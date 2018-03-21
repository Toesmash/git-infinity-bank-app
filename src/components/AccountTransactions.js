import React from 'react';
import iban from 'iban';
import { connect } from 'react-redux';
import { history } from '../routers/AppRouter';
import getAccountTransactions from '../selectors/accountTransactions';
import AccountTransactionItem from './AccountTransactionItem';

const AccountTransactions = (props) => {
   let displayAcc = ((history.location.pathname).split('/').splice(-1)[0]);

   return (
      <div>
         <div className='transaction-list__header'>
            <h3>Pohyby na účte </h3>
            <span className='iban'>{iban.printFormat(displayAcc, ' ')}</span>
         </div>
         <div className='list-header'>
            <div>Dátum</div>
            <div>Poznámka</div>
            <div>Príjemca</div>
            <div>Suma</div>
         </div>
         <div className='transaction-list'>
            {
               props.transactions.map((item) => {
                  return (<AccountTransactionItem key={item.id} {...item} />)
               }

               )
            }
         </div>
      </div>
   )
};

const mapStateToProp = (reduxState) => {
   let iban = ((history.location.pathname).split('/').splice(-1)[0]);
   if (iban == 'accounts') {
      iban = reduxState.accounts[0].iban;
      history.push(`/accounts/${reduxState.accounts[0].iban}`);
   }
   return {
      transactions: getAccountTransactions(reduxState.transactions[iban], reduxState.txnFilter)
   }
}



export default connect(mapStateToProp)(AccountTransactions);
// export default AccountTransactions;