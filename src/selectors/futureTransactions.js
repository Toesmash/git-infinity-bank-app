import moment from 'moment';


const getFutureTransactions = (accounts, transactions) => {
   const tomorrow = moment().add(1, 'day');
   const futureTxn = [];

   console.log(accounts, transactions);

   accounts.map((item) => {
      transactions[item.iban].map((txn) => {
         if (txn.paymentDate >= tomorrow.startOf('day').valueOf()) {
            futureTxn.push(txn)
         }
      })
   })
   futureTxn.sort((a, b) => {
      return a.paymentDate > b.paymentDate ? 1 : -1;
   });
   return futureTxn;
};

export default getFutureTransactions;