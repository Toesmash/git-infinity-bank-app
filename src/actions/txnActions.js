import database from '../firebase/firebase';

export const setTransactions = (txns) => ({
   type: 'SET_TRANSACTIONS',
   transactions: txns
});

export const startAddTransaction = (transaction) => {
   return (dispatch, getState) => {
      const uid = getState().auth.uid;
      const {
         ibanFrom = '',
         ibanTo = '',
         amount = 0,
         varSymbol = '',
         specSymbol = '',
         constSymbol = '',
         paymentDate = 0,
         expressChecked = undefined,
         note = ''
      } = transaction;

      const payment = {
         ibanFrom: ibanFrom,
         ibanTo: ibanTo,
         amount: amount,
         varSymbol: varSymbol,
         specSymbol: specSymbol,
         constSymbol: constSymbol,
         paymentDate: paymentDate,
         expressChecked: expressChecked,
         note: note
      };

      return database.ref(`transactions/${payment.ibanFrom}`).push(payment);

   }
};