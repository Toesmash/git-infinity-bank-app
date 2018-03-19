import moment from 'moment';

const filtersReducerDefaultState = {
      startDate: moment().startOf('month'),
      endDate: moment().endOf('month'),
      text: '',
      
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
      switch (action.type) {
            case 'SET_ACCOUNTS':
                  return action.accounts;
            default:
                  return state;
      }

};

export default filtersReducer;