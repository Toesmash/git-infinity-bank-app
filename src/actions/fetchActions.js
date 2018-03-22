import database from '../firebase/firebase';
import { setAccounts } from './accActions';
import { setTransactions } from './txnActions';

// export const startSetData = () => {
//    return (dispatch, getState) => {
//       const accounts = [];
//       let transactions = {};
//       const uid = getState().auth.uid;

//       return database.ref(`users/${uid}/accounts`).once('value').then((snapshot) => {
//          const accountPromises = []; // array to store promises
//          const transactionPromises = [];

//          let req_one;
//          let req_two;

//          snapshot.forEach((element) => {

//             // reference promise to pass into array
//             req_one = database.ref(`accounts/${element.key}`).once('value').then((snapshot) => {
//                accounts.push({
//                   iban: snapshot.key,
//                   ...snapshot.val()
//                })
//                transactions[snapshot.key] = [];
//                req_two = database.ref(`transactions/${snapshot.key}`).once('value').then((snapshot) => {
//                   snapshot.forEach((element) => {
//                      transactions[snapshot.key].push({
//                         id: element.key,
//                         ...element.val()
//                      });
//                   });

//                   console.log('PUSH 2')
//                });
//                accountPromises.push(req_two);
//             });

//             console.log('PUSH 1')
//             accountPromises.push(req_one)

//          });
//          return (Promise.all(accountPromises));
//       }).then(() => {

//          console.log("ACC: ", accounts);
//          console.log("TXN: ", transactions);
//          dispatch(setAccounts(accounts));
//          dispatch(setTransactions(transactions));

//       })
//    }
// };

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
               console.log('before promise')
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
         console.log('setAccounts');

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
         console.log('setTransactions');
      })
   }
};