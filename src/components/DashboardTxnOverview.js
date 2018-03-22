import React from 'react';
import { connect } from 'react-redux';

import numeral from 'numeral';
import iban from 'iban';

import moment from 'moment';
moment.locale('sk');

const DashboardTxnOverview = (props) => {
   const now = moment();
   const todayTxn = [];

   console.log('ACC: ', props.accounts);
   console.log('TXN: ', props.transactions);


      props.accounts.map((item) => {
         props.transactions[item.iban].map((txn) => {
            if (txn.paymentDate > now.startOf('day').valueOf() && txn.paymentDate < now.endOf('day').valueOf()) {
               todayTxn.push(txn);
            }
         });
      });


   return (
      <div className='dashboard-left'>
         <div className='dashboard-header'>
            <h3>Pohyby za deň: <span>{now.format('D.MMMM.YYYY')}</span></h3>
            <h3>Suma</h3>
         </div>
         {
            todayTxn.length == 0 && <div className='italic'>Žiadne pohyby za tento deň.</div>
         }
         {
            todayTxn.map((item, index) => {
               return (
                  <div key={index} className='dashboard--accounts__entry'>
                     <div className='dashboard--accounts__item'>

                        {
                           item.note ? <h4>{item.note}</h4> : <h4>Platba {index + 1}</h4>
                        }
                        {
                           <div>
                              <span>pre: </span> <span className='iban'>{iban.printFormat(item.ibanTo, ' ')}</span>
                              <br />
                              <span>od: </span> <span className='iban'>{iban.printFormat(item.ibanFrom, ' ')}</span>
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
   transactions: reduxStore.transactions,
   accounts: reduxStore.accounts
});

export default connect(mapStateToProps)(DashboardTxnOverview);
