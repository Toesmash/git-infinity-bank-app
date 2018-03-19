import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import { connect } from 'react-redux';

class SepaForm extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         ibanFrom: props.sepa ? props.sepa.ibanFrom : 'Zvolte si ucet',
         ibanTo: props.sepa ? props.sepa.ibanTo : '',
         amount: props.sepa ? props.sepa.amount : '',
         varSymbol: props.sepa ? props.sepa.varSymbol : '',
         specSymbol: props.sepa ? props.sepa.specSymbol : '',
         constSymbol: props.sepa ? props.sepa.constSymbol : '',
         paymentDate: props.sepa ? moment(props.sepa.paymentDate) : moment(),
         expressChecked: props.sepa ? props.sepa.expressChecked : false,
         calendarFocused: false,
         note: '',
         error: ''
      }
   }

   handleSubmit = (e) => {
      e.preventDefault();

      if (!this.state.ibanFrom || !this.state.ibanTo || !this.state.amount || !this.state.paymentDate) {
         this.setState(() => ({ error: 'Chybne vyplneny formular' }))
      }
      else {
         this.setState(() => ({ error: '' }));
         this.props.onSubmit({
            type: 'sepa',
            ibanFrom: this.state.ibanFrom,
            ibanTo: this.state.ibanTo,
            amount: parseFloat(this.state.amount, 10) * 100,
            varSymbol: this.state.varSymbol,
            specSymbol: this.state.specSymbol,
            constSymbol: this.state.constSymbol,
            paymentDate: this.state.paymentDate.valueOf(),
            expressChecked: this.state.expressChecked,
            note: this.state.note,
         });
      }
   };

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

   onVarSymbolChange = (e) => {
      const varSymbol = e.target.value;
      this.setState(() => ({ varSymbol: varSymbol }));
   }

   onSpecSymbolChange = (e) => {
      const specSymbol = e.target.value;
      this.setState(() => ({ specSymbol: specSymbol }));
   }

   onConstSymbolChange = (e) => {
      const constSymbol = e.target.value;
      this.setState(() => ({ constSymbol: constSymbol }));
   }

   onDateChange = (date) => {
      if (date) {
         this.setState(() => ({ paymentDate: date }));
      }
   }

   toggleExpress = () => {
      this.setState(() => ({ expressChecked: !this.state.expressChecked }));
   };

   onNoteChange = (e) => {
      const note = e.target.value;
      this.setState(() => ({ note: note }));
   }

   onFocusChange = ({ focused }) => {
      this.setState(() => ({ calendarFocused: focused }));
   };




   render() {
      return (
         <form onSubmit={this.handleSubmit}>
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
            <input type='text' placeholder='IBAN prijemcy'
               value={this.state.ibanTo}
               onChange={this.onIbanToChange}
            />
            <input type='text' placeholder='Zadajte sumu'
               value={this.state.amount}
               onChange={this.onAmountChange}
            />
            <input type='text' placeholder='Variabilny symbol'
               value={this.state.varSymbol}
               onChange={this.onVarSymbolChange}
            />
            <input type='text' placeholder='Specificky symbol'
               value={this.state.specSymbol}
               onChange={this.onSpecSymbolChange}
            />
            <input type='text' placeholder='Konstantny symbol'
               value={this.state.constSymbol}
               onChange={this.onConstSymbolChange}
            />
            <input type='text' placeholder='Poznamka pre prijemcy'
               value={this.state.note}
               onChange={this.onNoteChange}
            />
            <SingleDatePicker
               date={this.state.paymentDate}
               onDateChange={this.onDateChange}
               focused={this.state.calendarFocused}
               onFocusChange={this.onFocusChange}
               numberOfMonths={1}
            />
            <label>
               Express:
               <input type='checkbox'
                  value={this.state.expressChecked}
                  onChange={this.toggleExpress}
               />
            </label>
            {
               this.props.sepa ? <button>Zmen platbu</button> : <button>Posli platbu</button>
            }
            
         </form>
      )
   }
}

const mapStateToProps = (reduxStore) => ({
   accounts: reduxStore.accounts
});

export default connect(mapStateToProps)(SepaForm);