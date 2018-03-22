import React from 'react';
import { connect } from 'react-redux';
import iban from 'iban';
import { Link } from 'react-router-dom';

import AccountListItem from './AccountListItem';

const DashboardAccOverview = (props) => {
   return (
      <div className='dashboard-left'>
         <div className='dashboard-header'>
            <h3>Prehľad účtov</h3>
            <h3>Zostatok</h3>
         </div>
         {
            props.accounts.map((item, index) => {
               return (
                  <div key={index} className='dashboard--accounts__entry'>
                     <div className='dashboard--accounts__item'>
                        <Link to={`/accounts/${item.iban}`} >
                           <h4>{item.name}</h4>
                        </Link>
                        <p className='iban'>{iban.printFormat(item.iban, ' ')}</p>
                     </div>
                     <div className='dashboard--accounts__item'>
                        <h4>{item.balance} <span>{item.currency}</span></h4>
                     </div>
                  </div>
               )
            })
         }
      </div>
   );
}

const mapStateToProps = (reduxStore) => ({
   accounts: reduxStore.accounts,
   transactions: reduxStore.transactions
});

export default connect(mapStateToProps)(DashboardAccOverview);