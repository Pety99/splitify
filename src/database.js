import firebase from 'firebase/app';
import 'firebase/database';

const db = firebase.database();

export function createUser(user) {
    db.ref('users/' + user.uid).set({
        username: user.displayName,
        email: user.email,
        profile_picture: user.photoURL
    });
}

export const getUserByEmail = function (email, callback) {
    db.ref().child('users').orderByChild('email').equalTo(email).once('value', (snap) => {

        const user = snap.val();
        let userToDisplay = null;

        // Restructure the data
        if (user) {
            userToDisplay = {
                key: Object.keys(user)[0],
                value: {
                    email: Object.values(user)[0].email,
                    profile_picture: Object.values(user)[0].profile_picture,
                    username: Object.values(user)[0].username,
                }
            }
        }
        callback(userToDisplay);
    });
}