import moment from 'moment';

const txnFilterReducerDefaultState = {
   startDate: undefined,
   endDate: undefined,
   credit: true,
   debit: true,
   sortBy: 'date',
   text: '' // IBAN or Description,
}

const txnFilterReducer = (state = txnFilterReducerDefaultState, action) => {
   switch (action.type) {
      case 'SET_TEXT':
         return {
            ...state,
            text: action.text
         }

      case 'SORT_BY_DATE':
         return {
            ...state,
            sortBy: 'date'
         }

      case 'SORT_BY_AMOUNT':
         return {
            ...state,
            sortBy: 'amount'
         }

      case 'SET_START_DATE':
         return {
            ...state,
            startDate: action.date
         }

      case 'SET_END_DATE':
         return {
            ...state,
            endDate: action.date
         }

      case 'SET_RANGE_VALUES':
         return {
            ...state,
            value: action.input
         }
      case 'SET_LIMIT_VALUES':
         return {
            ...state,
            value: {
               min: action.limit.minLimit,
               max: action.limit.maxLimit
            },
            limits: {
               min: action.limit.minLimit - 50,
               max: action.limit.maxLimit + 50
            }
         }
      default:
         return state
   }
};

export default txnFilterReducer;