import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// Reducers
import authReducer from '../reducers/authReducer';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
   const store = createStore(
      combineReducers({
         auth: authReducer
      }),
      composeEnhancers(applyMiddleware(thunk))
   );

   return store;
};

export default configureStore;