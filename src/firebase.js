/* eslint-disable no-undef */
import firebase from 'firebase/app';

import 'firebase/analytics';

import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: 'function-test-b568e.firebaseapp.com',
    databaseURL: 'https://function-test-b568e-default-rtdb.firebaseio.com',
    projectId: 'function-test-b568e',
    storageBucket: 'function-test-b568e.appspot.com',
    messagingSenderId: '1096931535570',
    appId: '1:1096931535570:web:66c84fdb7ac76f3f151b0b',
    measurementId: 'G-C7MJWQSW9G',
};

firebase.initializeApp(firebaseConfig);

// Configure FirebaseUI.
export const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => false,
    },
};

export const auth = firebase.auth();
export const database = firebase.database();
export const storage = firebase.storage();
