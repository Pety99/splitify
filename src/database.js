import firebase from 'firebase/app';
import { storage } from './firebase';
import 'firebase/database';

const db = firebase.database();

export const uploadFile = function (user, currentGroupID, file) {
    const storageRef = storage.ref();
    const imagesRef = storageRef.child(
        `${currentGroupID}/${user.uid}/${file.name}`
    );

    imagesRef.put(file).then((snapshot) => {
        console.info(snapshot);
    });
};

/**
 * This function subscribes to a given database event and calls the callbacks with retrieved object.
 * @param {string} type The type of the database event ex: 'child_added', 'child_added'.
 * @param {string} path The path of the parent object you want to subscribe to ex: `/project-names/${uid}/`.
 * @param {[function]} callbacks Theese callback functions will be called with the retrieved object.
 */
export function subscribeToEvent(type, path, callbacks) {
    const ref = db.ref(path);
    ref.on(type, (snapshot) => {
        callbacks.forEach(async (callback) => {
            await callback(snapshot);
        });
    });
}

/**
 * This function unsubscribes from a given database event.
 * @param {string} type The type of the database event ex: 'child_added', 'child_added'.
 * @param {string} path The path of the parent object you want to unsubscribe from ex: `/project-names/${uid}/`.
 */
export const unsubscribeFromEvents = function (type, path) {
    const ref = db.ref(path);
    ref.off(type);
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// User methods
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const createUser = function (user) {
    // Check if the user already exists
    db.ref('users/' + user.uid).once('value', (snap) => {
        const userSnap = snap.val();

        if (!userSnap) {
            const updates = {};
            updates['users/' + user.uid] = {
                username: user.displayName,
                email: user.email,
                profile_picture: user.photoURL,
            };
            db.ref().update(updates);
        }
    });
};

export const getUserById = function (id) {
    return db.ref('users/' + id).once('value');
};

export const getUserByEmail = function (email, callback) {
    db.ref()
        .child('users')
        .orderByChild('email')
        .equalTo(email)
        .once('value', (snap) => {
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
                    },
                };
            }
            callback(userToDisplay);
        });
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Group methods
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Helper function.
 * Retrieves a new group key from the database.
 * Starts the updats object by setting a few of its fields.
 * @param {object} user Current User.
 * @returns The updates object.
 */
const crearteGroupKey = function (user) {
    const newGroupKey = db.ref().child('groups').push().key;
    const updates = {};
    updates[`users/${user.key}/groups/${newGroupKey}`] = true;
    return { newGroupKey, updates };
};

/**
 * Helper function.
 * Finishes the updates object by setting its fields from the data.
 * @param {object} updates
 * @param {string} groupKey
 * @param {object} data
 * @returns The updates object.
 */
const insertGroupData = function (updates, groupKey, data) {
    for (const user of data.users) {
        updates[`users/${user.key}/groups/${groupKey}`] = true;
    }

    updates[`groups/${groupKey}/name`] = data.groupName;
    for (const user of data.users) {
        console.log(user.key);
        updates[`groups/${groupKey}/members/${user.key}`] = true;
    }

    return updates;
};

export const createGroup = function (currentUser, data) {
    let { newGroupKey, updates } = crearteGroupKey(currentUser);
    updates = insertGroupData(updates, newGroupKey, data);

    db.ref().update(updates);
};

export const findGroupById = async function (id) {
    const snap = await db.ref().child(`groups/${id}`).once('value');

    const ret = {
        key: id,
        value: snap.val(),
    };

    return ret;
};

export const deleteGroup = function (groupKey, membersKeys) {
    const updates = {};

    updates[`groups/${groupKey}`] = null;
    for (const key of membersKeys) {
        updates[`users/${key}/groups/${groupKey}`] = null;
    }
    updates[`items/${groupKey}`] = null;
    updates[`receipts/${groupKey}`] = null;
    db.ref().update(updates);
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Item methods
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getItems = async function (groupId) {
    const snap = await db.ref().child(`items/${groupId}`).once('value');
    const result = [];
    for (const [key, value] of Object.entries(snap.val() || {})) {
        result.push({
            key: key,
            value: value,
        });
    }
    return result;
};

export const findItemById = async function (id, groupId) {
    const snap = await db.ref().child(`items/${groupId}/${id}`).once('value');

    // Restructure the data
    const ret = {
        key: id,
        value: snap.val(),
    };
    return ret;
};

export const updateItem = function (groupKey, itemKey, data) {
    const updates = {};
    updates[`items/${groupKey}/${itemKey}`] = data;

    db.ref().update(updates);
};

export const deleteItem = async function (groupKey, receiptKey, itemKey) {
    const updates = {};
    updates[`items/${groupKey}/${itemKey}`] = null;
    updates[`receipts/${groupKey}/${receiptKey}/items/${itemKey}`] = null;

    db.ref().update(updates);
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Receipt methods
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const updateReceiptTotal = function (groupKey, receiptKey, total) {
    const updates = {};
    updates[`receipts/${groupKey}/${receiptKey}/total`] = total;
    db.ref().update(updates);
};

export const deleteReceipt = function (groupKey, receiptKey) {
    const updates = {};

    db.ref()
        .child(`receipts/${groupKey}/${receiptKey}/items`)
        .once('value')
        .then((snapshot) => {
            // If there are no items an empty array is assigned
            const items = snapshot.val() ? Object.keys(snapshot.val()) : [];

            // Delete the items of the receipt
            for (const i of items) {
                updates[`items/${groupKey}/${i}`] = null;
            }
            // Delete the receipt
            updates[`receipts/${groupKey}/${receiptKey}`] = null;

            db.ref().update(updates);
        });
};
