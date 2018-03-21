import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// Reducers
import authReducer from '../reducers/authReducer';
import accReducer from '../reducers/accReducer';
import txnReducer from '../reducers/txnReducer';
import txnFilterReducer from '../reducers/txnFilterReducer';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
   const store = createStore(
      combineReducers({
         auth: authReducer,
         accounts: accReducer,
         transactions: txnReducer,
         txnFilter: txnFilterReducer
      }),
      composeEnhancers(applyMiddleware(thunk))
   );

   return store;
};

export default configureStore;