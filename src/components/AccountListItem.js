import React from 'react';
import { Link } from 'react-router-dom'

const AccountListItem = ({iban, name, type, status, balance}) => {
   return (
      <Link to={`/accounts/${iban}`}>
         <div>
            <h3>{name}</h3>
            <p>{iban}</p>
            <span>{type}</span>
         </div>
         <div>
            <h3>{balance}</h3>
         </div>
      </Link>
   )
};

export default AccountListItem;