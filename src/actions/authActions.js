import { firebase } from '../firebase/firebase';

export const login = (uid) => ({
   type: 'LOGIN',
   uid: uid
});

export const startLogin = (email, password) => {
   // console.log(email, password);
   return () => {
      firebase.auth().signInWithEmailAndPassword(email, password).catch((err) => {
         console.log("ERROR: ", err);
      });
   }
}

export const logout = () => ({
   type: 'LOGOUT'
});

export const startLogout = () => {
   return () => {
      firebase.auth().signOut();
   }
}