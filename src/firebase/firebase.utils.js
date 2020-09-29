import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDqDNTIOh5KNMXB2UY8YJi3QIUpYn7mpsM',
  authDomain: 'crwn-db-f0b9b.firebaseapp.com',
  databaseURL: 'https://crwn-db-f0b9b.firebaseio.com',
  projectId: 'crwn-db-f0b9b',
  storageBucket: 'crwn-db-f0b9b.appspot.com',
  messagingSenderId: '654122197905',
  appId: '1:654122197905:web:a5d2d8be7f605a5b6c3030',
  measurementId: 'G-TRLLHZ2TGP',
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
