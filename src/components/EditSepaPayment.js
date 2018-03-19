import React from 'react';
import SepaForm from './SepaForm';
import { connect } from 'react-redux';
import { startRemoveTransaction, startEditTransaction } from '../actions/txnActions';


const EditSepaPayment = (props) => {

   const onSubmit = (updatedPayment) => {
      props.startEditTransaction(props.match.params.iban, props.match.params.id, updatedPayment)
      props.history.push('/');
   };

   const onRemove = () => {
      props.startRemoveTransaction(props.match.params.iban, props.match.params.id);
      props.history.push('/');
   };



   return (
      <div>
         <h2>Nova SEPA platba</h2>
         <SepaForm
            sepa={props.transaction}
            onSubmit={onSubmit}
         />
         <button onClick={onRemove}>Zrus platbu</button>
      </div>
   )
};

const mapStateToProps = (reduxState, props) => {
   return {
      transaction: reduxState.transactions[props.match.params.iban].find((txn) => {
         return txn.id === props.match.params.id;
      })
   }
};

const mapDispatchToProps = (dispatch, props) => ({
   startRemoveTransaction: (iban, id) => dispatch(startRemoveTransaction(iban, id)),
   startEditTransaction: (originalIban, id, update) => dispatch(startEditTransaction(originalIban, id, update))
});


export default connect(mapStateToProps, mapDispatchToProps)(EditSepaPayment)