import database from '../firebase/firebase';

export const setAccounts = (accounts) => {
   // console.log(accounts)
   return {
      type: 'SET_ACCOUNTS',
      accounts: accounts
   }
};