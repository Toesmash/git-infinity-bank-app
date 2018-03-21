import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';
import iban from 'iban';

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
    const getSymbol = (data) => {
        if (data == 'debit') return '-';
        else return '+';
    }

    const getPayment = () => {
        return (
            <div className='transaction-item__details'>
                <p className='transaction-item__details--flex'>{moment(props.paymentDate).format('DD.MM.YYYY')}</p>
                <p className='iban transaction-item__details--flex'>{props.note} </p>
                <p className='iban transaction-item__details--flex'>{iban.printFormat(props.ibanTo, ' ')} </p>
                <p className='transaction-item__details--flex'>
                    {getSymbol(props.transaction)}{numeral(props.amount / 100).format('0,0[.]00$')}
                </p>
            </div>
        );
    }

    if (props.transaction == 'debit') {
        return (
            <Link to={`/payments/${props.type}/${props.ibanFrom}/${props.id}`} className='transaction-item'>
                {getPayment()}
            </Link>
        )
    }
    else {
        return (
            <div className='transaction-item'>
                {getPayment()}
            </div>
        )
    }


}

export default AccountTransactionItem;