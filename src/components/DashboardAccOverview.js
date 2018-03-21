import React from 'react';
import { connect } from 'react-redux';

import AccountListItem from './AccountListItem';

const DashboardAccOverview = (props) => {
   return (
      <div>
         <h3>PREHLAD UCTOV</h3>
         <h3>BALANCE</h3>
         {
            props.accounts.map((item, index) => {
               return (
                  <div key={index+1}>
                     <h4>{item.name}</h4>
                     <p>{item.iban}</p>
                     <p>{item.type}</p>
                     <h4>{item.balance}</h4>
                  </div>
               )
            })
         }
      </div>
   );
}

const mapStateToProps = (reduxStore) => ({
   accounts: reduxStore.accounts
});

export default connect(mapStateToProps)(DashboardAccOverview);