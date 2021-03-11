
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import { blue } from '@material-ui/core/colors';
import { Box, IconButton, ListItemSecondaryAction } from '@material-ui/core';
import AddUser from './AddUser';
import { Delete } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
    title: {
        textAlign: 'center',
    },
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    buttons: {
        display: 'flex',
        justifyContent: 'center'
    },
    button: {
        margin: theme.spacing(2)
    },
    listItem: {
        padddingRight: theme.spacing(3),
        paddingLeft: theme.spacing(3),
    },
    icon: {
        marginRight: theme.spacing(1.5),
        marginLeft: theme.spacing(1.5),
    },
    email: {
        overflow: 'hidden'
    },
}));

function SimpleDialog(props) {
    const classes = useStyles();
    const { onClose, open } = props;

    const [emails, setEmails] = React.useState(['username@gmail.com', 'user02@gmail.com']);

    const handleClose = () => {
        onClose();
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    const handleAddUser = (email) => {
        if (!emails.includes(email)) {
            setEmails([...emails, email]);
        }
    }

    const handleDelete = (email) => {
        setEmails(emails.filter(e => e != email));
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} maxWidth="sm" fullWidth={true}>
            <DialogTitle className={classes.title} id="simple-dialog-title">Create a new Group</DialogTitle>
            <AddUser handleClickAddUser={handleAddUser} />
            <List>
                {emails.map((email) => (
                    <ListItem key={email} className={classes.listItem}>
                        <ListItemAvatar>
                            <Avatar className={classes.avatar}>
                                <PersonIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText className={classes.email} primary={email} />
                        <ListItemSecondaryAction className={classes.icon}>
                            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(email)}>
                                <Delete />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            <Box className={classes.buttons}>
                <Button color="secondary" className={classes.button} onClick={() => handleListItemClick()}>Cancel</Button>
                <Button variant="contained" color="primary" className={classes.button} onClick={() => handleListItemClick(emails)}>Save</Button>
            </Box>

        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default function CreateGroup() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box display="flex" justifyContent='center' m={2} >
            <Button variant="contained" color="primary" onClick={handleClickOpen}>Create Group</Button>
            <SimpleDialog open={open} onClose={handleClose} />
        </Box>
    );
}
