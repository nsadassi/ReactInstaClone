// For Firebase JS SDK v7.20.0 and later, measurementId is optional

 import firebase from 'firebase';

 const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDMDFY2Aj50w0ow9hWhXgGP1Mx3mFtYU7U",
    authDomain: "instagram-clone-da33e.firebaseapp.com",
    databaseURL: "https://instagram-clone-da33e.firebaseio.com",
    projectId: "instagram-clone-da33e",
    storageBucket: "instagram-clone-da33e.appspot.com",
    messagingSenderId: "166978066068",
    appId: "1:166978066068:web:d39074321200a176194681",
    measurementId: "G-ED1B2ZDRD5"
 });

 const db = firebaseApp.firestore();
 const auth = firebase.auth();
 const storage = firebase.storage();

 export { db, auth, storage };