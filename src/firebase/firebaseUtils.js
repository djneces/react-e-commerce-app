import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';
import axios from '../axios-orders';

const FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;

const config = {
  apiKey: FIREBASE_API_KEY,
  authDomain: 'myshopapp-2a9da.firebaseapp.com',
  projectId: 'myshopapp-2a9da',
  storageBucket: 'myshopapp-2a9da.appspot.com',
  messagingSenderId: '955174035637',
  appId: '1:955174035637:web:e70937542cdd08b65ddefc',
  measurementId: 'G-BV6WCT3X5V',
};

//storing user in the DB (Firestore)
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  //getting ref a snapshot from Firestore
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  //creating record in Firestore for new users
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    const newUser = {
      email: email,
      displayName: displayName,
      ...additionalData,
    };

    //checking if email already exists in Realtime Database
    database
      .ref('users')
      .orderByChild('email')
      .equalTo(email)
      .once('value', async (snapshot) => {
        const userData = snapshot.val();

        if (userData === null) {
          //creating user profile in Realtime DB
          let userDbId;
          await axios
            .post('/users/.json', newUser)
            .then((response) => {
              //getting back the user Id from the DB
              userDbId = response.data.name;
            })
            .catch((err) => {
              console.error(err);
            });

          try {
            //creating user in Firestore
            await userRef.set({
              displayName,
              email,
              createdAt,
              userDbId,
              ...additionalData,
            });
          } catch (err) {
            console.log('Error creating user', err.message);
          }
        }
      });
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const database = firebase.database();

const provider = new firebase.auth.GoogleAuthProvider();
//always triggers Google pop up
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
