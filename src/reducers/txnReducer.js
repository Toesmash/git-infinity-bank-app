const txnReducerDefaultState = {};

const txnReducer = (state = txnReducerDefaultState, action) => {
   switch (action.type) {
      case 'SET_TRANSACTIONS':
         return action.transactions;
      default:
         return state;
   }
};

export default txnReducer;