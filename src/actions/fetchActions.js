import database from '../firebase/firebase';
import { setAccounts } from './accActions';
import { setTransactions } from './txnActions';

export const startSetData = () => {
   return (dispatch, getState) => {
      const accounts = [];
      let transactions = {};
      const uid = getState().auth.uid;

      return database.ref(`users/${uid}/accounts`).once('value').then((snapshot) => {
         const accountPromises = []; // array to store promises
         snapshot.forEach((element) => {

            // reference promise to pass into array
            const request = database.ref(`accounts/${element.key}`).once('value').then((snapshot) => {
               accounts.push({
                  iban: snapshot.key,
                  ...snapshot.val()
               })
            });
            // console.log(request);
            // push request promise to array
            accountPromises.push(request)

         });
         // console.log('Acc 1:', accounts);// accounts should still be empty here since requests are in progress
         // return promise that doesn't resolve until all requests completed
         return Promise.all(accountPromises);
      }).then(() => {
         dispatch(setAccounts(accounts));

      }).then(() => {
         const transactionPromises = [];
         accounts.map((account) => {
            transactions[account.iban] = [];
            const request = database.ref(`transactions/${account.iban}`).once('value').then((snapshot) => {
               snapshot.forEach((element) => {
                  const promise = transactions[account.iban].push({
                     id: element.key,
                     ...element.val()
                  });
               });
            });
            transactionPromises.push(request);
         });
         return Promise.all(transactionPromises);

      }).then(() => {
         dispatch(setTransactions(transactions));

      })
   }
};