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

import { createGroup } from '../../database';

const useStyles = makeStyles((theme) => ({
    title: {
        textAlign: 'center',
        fontSize: '4rem',
    },
    buttons: {
        display: 'flex',
        justifyContent: 'center',
    },
    button: {
        borderRadius: '20px',
        paddingRight: theme.spacing(4),
        paddingLeft: theme.spacing(4),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    margin: {
        margin: theme.spacing(2),
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
        },
    };

    // Stores the data of the added users to the list
    const [users, setUsers] = useState([currentUserToDisplay]);
    const [groupName, setGroupName] = useState('');
    const [inputError, setInputError] = useState(false);

    //handles the change of text in the group name
    const handleGroupNameChange = (text) => {
        if (text == '') {
            setInputError(true);
        } else {
            setInputError(false);
        }
        setGroupName(text);
    };

    const handleClose = () => {
        setUsers([currentUserToDisplay]);
        onClose();
    };

    // handles the click of cancel and save buttons
    const handleExitClick = (value) => {
        if (value) {
            if (groupName == '') {
                setInputError(true);
            } else {
                setUsers([currentUserToDisplay]);
                onClose(value);
            }
        } else {
            setUsers([currentUserToDisplay]);
            onClose(value);
        }
    };

    // Adds a user to the list if its not already in there
    const handleAddUser = (user) => {
        if (!userAlreadyAdded(user)) {
            setUsers([...users, user]);
        }
    };

    // Checks if a user is already present in the users list
    const userAlreadyAdded = (user) => {
        for (const u of users) {
            if (u.key === user.key) {
                return true;
            }
        }
        return false;
    };

    // Deletes a user from the users list
    const handleDelete = (user) => {
        setUsers(users.filter((e) => e != user));
    };

    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby="simple-dialog-title"
            open={open}
            maxWidth="sm"
            fullWidth={true}
        >
            <DialogTitle className={classes.title} id="simple-dialog-title">
                Create new group
            </DialogTitle>
            <ValidatingInput
                handleChange={handleGroupNameChange}
                error={inputError}
            />
            <AddUser handleClickAddUser={handleAddUser} />
            <UsersList
                currentUser={currentUser}
                users={users}
                handleDelete={handleDelete}
            />
            <Box className={classes.buttons}>
                <Button
                    color="secondary"
                    className={`${classes.button} ${classes.margin}`}
                    onClick={() => handleExitClick()}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    className={`${classes.button} ${classes.margin}`}
                    onClick={() =>
                        handleExitClick({ users: users, groupName: groupName })
                    }
                >
                    Save
                </Button>
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
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (data) => {
        if (data) {
            const currentUser = data.users[0];
            createGroup(currentUser, data);
        }
        setOpen(false);
    };

    return (
        <Box display="flex" justifyContent="center" m={2}>
            <Button
                variant="contained"
                color="primary"
                onClick={handleClickOpen}
                className={classes.button}
            >
                Create Group
            </Button>
            <SimpleDialog
                open={open}
                onClose={handleClose}
                currentUser={props.currentUser}
            />
        </Box>
    );
}

CreateGroup.propTypes = {
    currentUser: PropTypes.object.isRequired,
};

export default CreateGroup;
