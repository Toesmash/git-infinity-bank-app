
export const setTextFilter = (text) => ({
   type: 'SET_TEXT',
   text: text
})

export const sortByDate = () => ({
   type: 'SORT_BY_DATE',
});

export const sortByAmount = () => ({
   type: 'SORT_BY_AMOUNT',
});

export const setStartDate = (date) => ({
   type: 'SET_START_DATE',
   date: date
})

export const setEndDate = (date) => ({
   type: 'SET_END_DATE',
   date: date
})

export const setRangeValues = (input) => ({
   type: 'SET_RANGE_VALUES',
   input: input
});

export const setLimitValues = (txns) => {
   let realAmount = 0;
   const limit = {
      minLimit: 0,
      maxLimit: 0
   }

   txns.map((item) => {
      // zistim ci je to debit / credit
      if (item.transaction == 'debit') {
         realAmount = (item.amount / 100 ) * (-1);
      }
      else {
         realAmount = (item.amount / 100 );
      }

      // najdem min max
      if (realAmount < limit.minLimit) {
         limit.minLimit = realAmount;
      }
      else if (realAmount > limit.maxLimit) {
         limit.maxLimit = realAmount;
      }
   });

   return {
      type: 'SET_LIMIT_VALUES',
      limit: limit
   }
};