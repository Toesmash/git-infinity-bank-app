import React from 'react';
import { connect } from 'react-redux';

import AccountListItem from './AccountListItem';

const AccountList = (props) => {
   return (
      <div>
         <h2>Zoznam uctov</h2>
         {
            props.accounts.length === 0 ? (<p>No accounts</p>) :
               (
                  props.accounts.map((item, index) => (
                     <AccountListItem {...item} key={index + 1} />
                  ))
               )
         }
      </div>
   );
};

const mapStateToProps = (reduxStore) => ({
   accounts: reduxStore.accounts
});

export default connect(mapStateToProps)(AccountList);