
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { Box } from '@material-ui/core';
import AddUser from './AddUser';
import UsersList from './UsersList';
import { useState } from 'react';
import ValidatingInput from './ValidatingInput';

import {createGroup, updateGroup} from '../../database';


const useStyles = makeStyles((theme) => ({
    title: {
        textAlign: 'center',
        fontSize: '4rem'
    },
    buttons: {
        display: 'flex',
        justifyContent: 'center'
    },
    button: {
        margin: theme.spacing(2)
    },
   
}));

function SimpleDialog(props) {
    const classes = useStyles();

    const { onClose, open, currentUser } = props;

    // Get the data of the current user, and automatically add it to the list
    const currentUserToDisplay = {
        key: currentUser.uid,
        value: {
            email: currentUser.email,
            profile_picture: currentUser.photoURL,
            username: currentUser.displayName,
        }
    }

    // Stores the data of the added users to the list
    const [users, setUsers] = useState([currentUserToDisplay]);
    const [groupName, setGroupName] = useState('');
    const [inputError, setInputError] = useState(false);

    //handles the change of text in the group name
    const handleGroupNameChange = (text) => {
        if (text == '') {
            setInputError(true);
        }
        else {
            setInputError(false);
        }
        setGroupName(text);
    }

    const handleClose = () => {
        setUsers([currentUserToDisplay]);
        onClose();
    };

    // handles the click of cancel and save buttons
    const handleExitClick = (value) => {
        setUsers([currentUserToDisplay]);
        console.log(value);
        if (value) {
            if(groupName == ''){
                setInputError(true);
            }
            else{
                onClose(value);
            }
        } else {
            onClose(value);
        }
    };

    // Adds a user to the list if its not already in there
    const handleAddUser = (user) => {
        if (!userAlreadyAdded(user)) {
            console.log(user);
            console.log(currentUser)
            setUsers([...users, user]);
        }
    }

    // Checks if a user is already present in the users list
    const userAlreadyAdded = (user) => {
        for (const u of users) {
            if (u.key === user.key) {
                return true;
            }
        }
        return false;
    }

    // Deletes a user from the users list
    const handleDelete = (user) => {
        setUsers(users.filter(e => e != user));
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} maxWidth="sm" fullWidth={true}>
            <DialogTitle className={classes.title} id="simple-dialog-title">Create new group</DialogTitle>
            <ValidatingInput handleChange={handleGroupNameChange} error={inputError}/>
            <AddUser handleClickAddUser={handleAddUser} />
            <UsersList currentUser={currentUser} users={users} handleDelete={handleDelete} />
            <Box className={classes.buttons}>
                <Button color="secondary" className={classes.button} onClick={() => handleExitClick()}>Cancel</Button>
                <Button variant="contained" color="primary" className={classes.button} onClick={() => handleExitClick({users : users, groupName : groupName})}>Save</Button>
            </Box>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    currentUser: PropTypes.object.isRequired,
};

function CreateGroup(props) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    /*
    [
        {
            "key": "LRcelLR3xbaRccpjGGSgOPHLH5L2",
            "value": {
                "email": "abordanpeter@gmail.com",
                "profile_picture": "https://lh3.googleusercontent.com/a-/AOh14GhVUy7cSQOB2S8UjZcT5HT1JJuJAP4xpxczvUA4Qw=s96-c",
                "username": "Péter Abordán"
            }
        },
        {
            "key": "SgfEGsrjwjSDPN2E6wpWVtX9uh82",
            "value": {
                "email": "asd@gmail.com",
                "username": "asd"
            }
        }
    ]
    */
    const handleClose = (data) => {
        if(data){
            const currentUser = data.users[0];
            createGroup(currentUser).then(
                (newGroupKey) => {
                    updateGroup(newGroupKey, data)
                }
            );
        }
        setOpen(false);
    };

    return (
        <Box display="flex" justifyContent='center' m={2} >
            <Button variant="contained" color="primary" onClick={handleClickOpen}>Create Group</Button>
            <SimpleDialog open={open} onClose={handleClose} currentUser={props.currentUser} />
        </Box>
    );
}

CreateGroup.propTypes = {
    currentUser: PropTypes.object.isRequired
}

export default CreateGroup;
