import React from 'react';
import { Link } from 'react-router-dom'
import IBAN from 'iban';

const AccountListItem = ({ iban, name, type, status, balance, currency }) => {
   return (
      <div className='account-container'>
         <Link to={`/accounts/${iban}`} className='account-item'>
            <div>
               <h3>{name}</h3>
               <p className='iban'>{IBAN.printFormat(iban, ' ')}</p>
               <span className='type'>{type}</span>
            </div>
            <div>
               <h3>{balance} <span>{currency}</span></h3>
            </div>
         </Link>
      </div>
   )
};

export default AccountListItem;