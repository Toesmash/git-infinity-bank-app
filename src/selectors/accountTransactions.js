import moment from 'moment';


const getAccountTransactions = (transactions, { startDate, endDate, credit, debit, sortBy, text, }) => {

   return transactions.filter((item) => {
      let txnAmount = item.amount / 100;
      if (item.transaction == 'debit') {
         txnAmount = txnAmount * (-1);
      }

      const createdAtMoment = moment(item.paymentDate);
      const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
      const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
      const textMatch = ((item.ibanFrom.toLowerCase()).includes(text.toLowerCase())) || ((item.note.toLowerCase()).includes(text.toLowerCase()));
      // const minLimit = value.min ? (txnAmount) >= value.min : true;
      // const maxLimit = value.max ? (txnAmount) <= value.max : true;

      return startDateMatch && endDateMatch && textMatch;
   }).sort((a, b) => {
      if (sortBy === 'date') {
         return a.paymentDate < b.paymentDate ? 1 : -1;
      }
      else if (sortBy === 'amount') {
         let x = a.amount;
         let y = b.amount;
         if (a.transaction == 'debit') {
            x = x * (-1);
         }
         else if (b.transaction == 'debit') {
            y = y * (-1);
         }
         return x < y ? 1 : -1;
      }
   });
};

export default getAccountTransactions;