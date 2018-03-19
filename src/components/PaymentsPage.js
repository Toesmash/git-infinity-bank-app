import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const PaymentsPage = ({ accounts }) => {

   const handleFastPayment = (e) => {
      e.preventDefault()
      // const user = e.target[0].value;
      // const password = e.target[1].value;
      // const email = user + '@infinity.com'
      // props.startLogin(email, password);
   }

   return (
      <div>
         <h2>Rychla domaca platba</h2>
         <form onSubmit={handleFastPayment}>
            <select>
               {
                  accounts.map((item, index) => {
                     if ((item.iban).substring(0, 2) == 'SK') {
                        return (
                           <option key={index + 1}>{item.iban}</option>
                        )
                     }

                  })
               }
            </select>
            <input type='text' placeholder='Suma' />
            <input type='text' placeholder='IBAN prijimatela' />
            <button>Odosli platbu</button>
         </form>

         <div>
            <Link to='/payments/sepa' >SEPA platba</Link>
         </div>
         <div>
            <Link to='/payments/intr' >Medzinarodna platba</Link>
         </div>
         <div>
            <Link to='/payments/acctr' >Prevod medzi uctami</Link>
         </div>

      </div>
   )
};

const mapStateToProps = (reduxStore) => ({
   accounts: reduxStore.accounts
});

export default connect(mapStateToProps)(PaymentsPage);