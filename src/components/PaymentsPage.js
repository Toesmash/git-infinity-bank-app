import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { startAddTransaction } from '../actions/txnActions';


class PaymentsPage extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         paymentDate: moment(),
         ibanFrom: 'Zvolte si ucet',
         ibanTo: '',
         amount: '',
         error: ''
      }
   }

   onIbanFromChange = (e) => {
      const ibanFrom = e.target.value;
      this.setState(() => ({ ibanFrom: ibanFrom }));
   }

   onIbanToChange = (e) => {
      const ibanTo = e.target.value;
      this.setState(() => ({ ibanTo: ibanTo }));
   }

   onAmountChange = (e) => {
      const amount = e.target.value;
      if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
         this.setState(() => ({ amount: amount }));
      }
   }

   handleFastPayment = (e) => {
      e.preventDefault();

      if (this.state.ibanFrom == 'Zvolte si ucet' || !this.state.ibanTo || !this.state.amount) {
         console.log('tu')
         this.setState(() => ({ error: 'Chybne vyplneny formular' }))
      }
      else {
         this.setState(() => ({ 
            error: '' 
         }));

         console.log(this.state.amount);
         this.props.startAddTransaction({
            type: 'sepa',
            transaction: 'debit',
            ibanFrom: this.state.ibanFrom,
            ibanTo: this.state.ibanTo,
            amount: parseFloat(this.state.amount, 10) * 100,
            paymentDate: this.state.paymentDate.valueOf()
         });
         // props.history.push('/dashboard');
      }
   }


   render() {
      return (
         <div>
            <h2>Rychla domaca platba</h2>
            <form onSubmit={this.handleFastPayment}>
               {this.state.error && <p>{this.state.error}</p>}
               <select
                  onChange={this.onIbanFromChange}
               >
                  <option key='0' defaultValue hidden>{this.state.ibanFrom}</option>
                  {
                     this.props.accounts.map((item, index) => {
                        return (
                           <option key={index + 1} >{item.iban}</option>
                        )
                     })
                  }
               </select>
               <input
                  type='text'
                  placeholder='Suma'
                  value={this.state.amount}
                  onChange={this.onAmountChange}
               />
               <input
                  type='text'
                  placeholder='IBAN prijimatela'
                  value={this.state.ibanTo}
                  onChange={this.onIbanToChange}

               />
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

      );
   }
}

const mapStateToProps = (reduxStore) => ({
   accounts: reduxStore.accounts
});

const mapDispatchToProps = (dispatch) => ({
   startAddTransaction: (payment) => dispatch(startAddTransaction(payment))
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentsPage);