import firebase from 'firebase/app';
import 'firebase/database';

const db = firebase.database();

export function createUser(user) {
    // Check if the user already exists
    db.ref('users/' + user.uid).once('value', (snap) => {
        const user = snap.val();
        
        if(!user){
            const updates = {};
            updates['users/' + user.uid] = {
                username: user.displayName,
                email: user.email,
                profile_picture: user.photoURL
            }
            db.ref().update(updates);
        }
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

//Create Group
export const createGroup = function (user) {
    return new Promise((resolve, reject) =>{
        const newGroupKey = db.ref().child('groups').push().key;
        const updates = {};
        updates[`groups/${newGroupKey}`] = true;
        updates[`users/${user.key}/groups/${newGroupKey}`] = true;
    
        db.ref().update(updates).then(resolve(newGroupKey));
        reject();
    })
}

// Update Group after confirming the members and the name
export const updateGroup = function(groupKey, data) {
    const updates = {};

    for (const user of data.users) {
        updates[`users/${user.key}/groups/${groupKey}`] = true;
    }

    updates[`groups/${groupKey}/name`] = data.groupName;
    for (const user of data.users) {
        console.log(user.key);
        updates[`groups/${groupKey}/members/${user.key}`] = true;
    }
    db.ref().update(updates);
}