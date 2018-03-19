import database from '../firebase/firebase';

export const setTransactions = (txns) => ({
   type: 'SET_TRANSACTIONS',
   transactions: txns
});

export const addTransaction = (txn) => ({
   type: 'ADD_TRANSACTION',
   transaction: txn
});


export const startAddTransaction = (transaction) => {
   return (dispatch, getState) => {
      const uid = getState().auth.uid;
      const {
         type = '',
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
         type: type,
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

      return database.ref(`transactions/${payment.ibanFrom}`).push(payment).then((ref) => {
         dispatch(addTransaction({
            id: ref.key,
            ...payment
         }));
      });

   }
};

export const removeTransaction = (iban, id) => ({
   type: 'REMOVE_TRANSACTION',
   iban: iban,
   id: id
});

export const startRemoveTransaction = (iban, id) => {
   return (dispatch, getState) => {
      return database.ref(`/transactions/${iban}/${id}`).remove().then(() => {
         dispatch(removeTransaction(iban, id));
      })
   }
};

export const editTransaction = (originalIban, id, update) => ({
   type: 'EDIT_TRANSACTION',
   originalIban: originalIban,
   id: id,
   update: update
});

export const startEditTransaction = (originalIban, id, update) => {
   return (dispatch) => {
      return database.ref(`/transactions/${originalIban}/${id}`).remove().then(() => {
         return database.ref(`/transactions/${update.ibanFrom}/${id}`).set({ ...update }).then(() => {
            dispatch(editTransaction(originalIban, id, update));
         })
      })
   }
};