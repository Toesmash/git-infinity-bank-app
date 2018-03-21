import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { history } from '../routers/AppRouter';

import { setTextFilter, sortByAmount, sortByDate, setEndDate, setStartDate, setRangeValues, setLimitValues } from '../actions/txnFilterActions';
// RANGE
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';



class AccountFilter extends React.Component {
   constructor(props) {
      super(props);
      let iban = ((history.location.pathname).split('/').splice(-1)[0]);
      if (iban !== 'accounts') {
         this.props.setLimitValues(this.props.txn[iban]);
      }


      this.state = {
         calendarFocused: null,
      }
   }

   onTextChange = (e) => {
      this.props.setTextFilter(e.target.value);
   };

   onSortChange = (e) => {
      if (e.target.value === 'date') {
         this.props.sortByDate();
      }
      else if (e.target.value === 'amount') {
         this.props.sortByAmount();
      }
   };

   onDatesChange = ({ startDate, endDate }) => {
      this.props.setStartDate(startDate);
      this.props.setEndDate(endDate);
   }

   onFocusChange = (newCalendarFocused) => {
      this.setState(() => ({
         calendarFocused: newCalendarFocused
      }))
   }

   onRangeValuesChange = (input) => {
      this.props.setRangeValues(input);
   };

   render() {
      return (
         <div>
            <div className='input-group input-group__header'>
               <h3>Filter</h3>
               <button>Vymaž filter</button>
            </div>
            <div className='input-group'>
               <input
                  className='text-input'
                  type='text'
                  value={this.props.filter.text}
                  onChange={this.onTextChange}
                  placeholder='Vyhladaj IBAN alebo referenciu platby'
               />
               <select
                  className='select'
                  value={this.props.filter.sortBy}
                  onChange={this.onSortChange}
               >
                  <option value='date'>Dátum</option>
                  <option value='amount'>Suma</option>
               </select>
               <DateRangePicker
                  startDate={this.props.filter.startDate}
                  endDate={this.props.filter.endDate}
                  onDatesChange={this.onDatesChange}
                  focusedInput={this.state.calendarFocused}
                  onFocusChange={this.onFocusChange}
                  numberOfMonths={1}
                  isOutsideRange={() => false}
                  showClearDates={true}
               />
            </div>
            <div className='input-group'>
               <label>Kredit: </label>
               <input
                  type='checkbox'
               />
               <label> Debit: </label>
               <input
                  type='checkbox'
               />
            </div>






         </div>
      )
   }
}

const mapStateToProps = (reduxStore) => ({
   filter: reduxStore.txnFilter,
   txn: reduxStore.transactions
});

const mapDispatchToProps = (dispatch) => ({
   setTextFilter: (text) => dispatch(setTextFilter(text)),
   sortByDate: () => dispatch(sortByDate()),
   sortByAmount: () => dispatch(sortByAmount()),
   setStartDate: (date) => dispatch(setStartDate(date)),
   setEndDate: (date) => dispatch(setEndDate(date)),
   setRangeValues: (input) => dispatch(setRangeValues(input)),
   setLimitValues: (txns) => dispatch(setLimitValues(txns))

});



export default connect(mapStateToProps, mapDispatchToProps)(AccountFilter);