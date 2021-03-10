import firebase from 'firebase/app';
import 'firebase/database';

const  db = firebase.database();

export function createUser(user) {
    db.ref('users/' + user.uid).set({
        username: user.displayName,
        email: user.email,
        profile_picture: user.photoURL
    });
}