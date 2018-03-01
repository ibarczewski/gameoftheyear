import firebase from 'firebase';
const config = {
    apiKey: "AIzaSyDGE6qLRlTHhQEz3cKK_4lOSYzx-IPb6Aw",
    authDomain: "gotyvoting.firebaseapp.com",
    databaseURL: "https://gotyvoting.firebaseio.com",
    projectId: "gotyvoting",
    storageBucket: "gotyvoting.appspot.com",
    messagingSenderId: "690069754760"
  };
firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;