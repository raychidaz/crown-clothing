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

// use & update firestore DB
export const createUserProfileDocument = async (
  userAuth,
  ...additionalData
) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  const { serverTimestamp } = firebase.firestore.FieldValue;

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = serverTimestamp();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

// util for adding shop data to firestore
export const addCollectionsAndDocuments = async (
  collectionKey,
  objectsToAdd,
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  await batch.commit();
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
