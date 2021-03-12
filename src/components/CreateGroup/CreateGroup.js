
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
import { Box, IconButton, ListItemSecondaryAction, TextField } from '@material-ui/core';
import AddUser from './AddUser';
import { Delete } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
    title: {
        textAlign: 'center',
        fontSize: '4rem'
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
    user: {
        overflow: 'hidden'
    },
    textField: {
        marginRight: theme.spacing(3),
        marginLeft: theme.spacing(3),
        marginBottom: theme.spacing(2),
    }
}));

function SimpleDialog(props) {
    const classes = useStyles();
    const { onClose, open } = props;

    const [users, setUsers] = React.useState([]);

    const handleClose = () => {
        onClose();
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    const handleAddUser = (user) => {
        if (!users.includes(user)) {
            setUsers([...users, user]);
        }
    }

    const handleDelete = (user) => {
        setUsers(users.filter(e => e != user));
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} maxWidth="sm" fullWidth={true}>
            <DialogTitle className={classes.title} id="simple-dialog-title">Create new group</DialogTitle>
            <TextField id="outlined-basic" label="Group name" variant="outlined" className={classes.textField}/>
            <AddUser handleClickAddUser={handleAddUser} />
            <List>
                {users.map((user) => (
                    <ListItem key={Object.keys(Object.keys(user)[0])} className={classes.listItem}>
                        <ListItemAvatar>
                            <Avatar className={classes.avatar} src={Object.values(user)[0]['profile_picture']}>
                                <PersonIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText className={classes.user} primary={Object.values(user)[0].username } />
                        <ListItemSecondaryAction className={classes.icon}>
                            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(user)}>
                                <Delete />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            <Box className={classes.buttons}>
                <Button color="secondary" className={classes.button} onClick={() => handleListItemClick()}>Cancel</Button>
                <Button variant="contained" color="primary" className={classes.button} onClick={() => handleListItemClick(users)}>Save</Button>
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
