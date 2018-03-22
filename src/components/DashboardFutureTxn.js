import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import iban from 'iban';
import numeral from 'numeral';

import getFutureTransactions from '../selectors/futureTransactions';


const DashboardFutureTxn = (props) => {
   const futureTxn = props.transactions;

   return (
      <div className='dashboard-right'>
         <div className='dashboard-header'>
            <h3>Plánované platby</h3>
         </div>
         {
            futureTxn.length == 0 && <div className='italic'>Žiadne plánované platby.</div>
         }
         {
            futureTxn.map((item, index) => {
               return (
                  <div key={index} className='dashboard--accounts__entry'>
                     <div className='dashboard--accounts__item'>
                        {
                           <div>
                              <h4>{moment(item.paymentDate).format('D.MMMM.YYYY')}</h4>
                              <span className='iban iban__small'>{iban.printFormat(item.ibanFrom, ' ')}</span>
                              <br />
                              <span>{item.note}</span>
                           </div>
                        }
                     </div>
                     <div className='dashboard--accounts__item'>
                        <h4>{item.transaction == 'debit' ? '-' : '+'}{numeral(item.amount / 100).format('0,0[.]00')} <span>EUR</span></h4>
                     </div>
                  </div>
               );
            })
         }
      </div>
   )
};




const mapStateToProps = (reduxStore) => ({
   transactions: getFutureTransactions(reduxStore.accounts, reduxStore.transactions),
   accounts: reduxStore.accounts
});

export default connect(mapStateToProps)(DashboardFutureTxn);