import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

numeral.register('locale', 'svk', {
   delimiters: {
       thousands: ',',
       decimal: '.'
   },
   abbreviations: {
       thousand: 'k',
       million: 'm',
       billion: 'b',
       trillion: 't'
   },
   currency: {
       symbol: '€'
   }
});
numeral.locale('svk');

const AccountTransactionItem = (props) => {
   return (
      <Link to={`/payments/${props.type}/${props.ibanFrom}/${props.id}`}>
         <div>
            <p>{moment(props.paymentDate).format('DD.MM.YYYY')}</p>
            <p>OD: {props.ibanFrom}</p>
            <p>PRE: {props.ibanTo}</p>
            <p>{numeral(props.amount / 100).format('0,0[.]00$')}</p>
         </div>
         
      </Link>
   )
}

export default AccountTransactionItem;