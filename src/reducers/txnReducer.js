const txnReducerDefaultState = {};

const txnReducer = (state = txnReducerDefaultState, action) => {
      switch (action.type) {

            default:
                  return state;
            case 'SET_TRANSACTIONS':
                  return action.transactions;

            case 'ADD_TRANSACTION':
                  const iban = action.transaction.ibanFrom;
                  state[iban].push(action.transaction);
                  return state;

            case 'REMOVE_TRANSACTION':
                  const removeState = state[action.iban].filter((txn) => {
                        return action.id !== txn.id
                  });
                  state[action.iban] = removeState;
                  return state;

            case 'EDIT_TRANSACTION':
                  // VYMAZEM STARY ZAZNAM
                  const editState = state[action.originalIban].filter((txn) => {
                        return action.id !== txn.id
                  });
                  state[action.originalIban] = editState;

                  // VYTVORIM NOVY ZAZNAM S TYM ISTYM ID
                  state[action.update.ibanFrom].push({
                        id: action.id,
                        ...action.update
                  });
                  return state;

      }
};

export default txnReducer;